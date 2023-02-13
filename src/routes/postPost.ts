import { Application } from 'express-ws'
import path from 'path'
import bodyParser from 'body-parser'
import fileUpload, { UploadedFile } from 'express-fileupload'
import { v4 as uuidv4 } from 'uuid'
import { createPost } from '../../repositories/postRepository'
import { WebSocket } from 'ws'

export function postPost(app: Application) {
  app.post(
    '/post',
    bodyParser.urlencoded(),
    fileUpload({
      limits: {
        fileSize: 8 * (1024 * 1024), // max 8 MB
      },
      abortOnLimit: true,
      uriDecodeFileNames: true,
    }),
    async (req, res) => {
      const ws = new WebSocket('ws://localhost:3000/ws-post')
      let imageToSave
      if (req.files) {
        const file = req.files.image as UploadedFile

        const extensionName = path.extname(file.name) // fetch the file extension
        const allowedExtension = ['.png', '.jpg', '.jpeg']

        if (!allowedExtension.includes(extensionName)) {
          return res.status(422).send('Invalid Image')
        }

        file.name = uuidv4() + extensionName

        const filePath = path.join(
          __dirname,
          '../../public/image/post_image/' + file.name
        )

        file.mv(filePath, (err) => {
          if (err) {
            return res.status(500).send(err)
          }
          imageToSave = file.name
        })
      }
      let post = req.body
      try {
        if (!post.content) {
          const error = encodeURI('Post content not be null')
          res.status(401).redirect('/profile?error=' + error)
          return
        }
        await createPost(req.signedCookies.ssid, post.content, imageToSave)
        const state = encodeURI('Post send successfully!')
        ws.send(
          JSON.stringify({
            type: 'post',
            data: {
              content: post.content,
            },
          })
        )
        res.redirect('/profile?success=' + state)
      } catch (e) {
        console.error(e)
        res.status(500).send('Internal Server Error')
      }
    }
  )
}

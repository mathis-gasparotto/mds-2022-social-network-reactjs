import { Application } from 'express-ws'
import path from 'path'
import bodyParser from 'body-parser'
import fileUpload, { UploadedFile } from 'express-fileupload'
import { v4 as uuidv4 } from 'uuid'
import { createPost } from '../repositories/postRepository'
import { WebSocket } from 'ws'
import { findUserById } from '../repositories/userRepository'

export function postPost(app: Application, sockets: Map<string, WebSocket>) {
  app.post(
    '/api/v1/post',
    bodyParser.json(),
    // bodyParser.urlencoded(),
    fileUpload({
      limits: {
        fileSize: 8 * (1024 * 1024), // max 8 MB
      },
      abortOnLimit: true,
      uriDecodeFileNames: true,
    }),
    async (req, res) => {
      // const ws = new WebSocket('ws://localhost:3000/ws-post')
      let file
      if (req.files) {
        file = req.files.image as UploadedFile

        const extensionName = path.extname(file.name) // fetch the file extension
        const allowedExtension = ['.png', '.jpg', '.jpeg']

        if (!allowedExtension.includes(extensionName)) {
          const error = encodeURI('Invalid Image')
          return res.status(422).redirect('/?error=' + error)
        }

        file.name = uuidv4() + extensionName

        const filePath = path.join(
          __dirname,
          '../../public/img/post_image/' + file.name
        )

        file.mv(filePath, (err) => {
          if (err) {
            return res.status(500).send(err)
          }
        })
      }
      let post = req.body
      try {
        if (!post.content) {
          res.status(400).send({message: 'Post content not be null'})
          // const error = encodeURI('Post content not be null')
          // res.status(400).redirect('/?error=' + error)
          return
        }
        const imageToSave = file ? file.name : ''
        const createdPost = await createPost(
          req.signedCookies.ssid,
          post.content,
          imageToSave
        )
        // const user = await findUserById(req.signedCookies.ssid)
        // if (!user) {
        //   return
        // }
        // sockets.forEach((socket) => {
        //   socket.send(
        //     JSON.stringify({
        //       type: 'post',
        //       data: {
        //         author: user.name,
        //         date: createdPost.createdAt,
        //         content: post.content,
        //         image: '/img/post_image/' + imageToSave,
        //       },
        //     })
        //   )
        // })
        res.status(201).send(createdPost)
        // const state = encodeURI('Post send successfully!')
        // res.status(201).redirect('/?success=' + state)
      } catch (e) {
        console.error(e)
        res.status(500).send({message: 'Internal Server Error'})
        // const error = encodeURI('Internal Server Error')
        // res.status(500).redirect('/?error=' + error)
      }
    }
  )
}

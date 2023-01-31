import { Application } from 'express-ws'
import path from 'path'
import bodyParser from 'body-parser'
import { findUserById, updateUser } from '../../repositories/userRepository'
import fileUpload, { UploadedFile } from 'express-fileupload'

export function postProfile(app: Application) {
  app.post(
    '/profile',
    bodyParser.urlencoded(),
    fileUpload({
      limits: {
        fileSize: 8 * (1024 * 1024), // max 8 MB
      },
      abortOnLimit: true,
      uriDecodeFileNames: true
    }),
    async (req, res) => {
      let avatarToSave
      if (req.files) {
        const file = req.files.avatar as UploadedFile

        const extensionName = path.extname(file.name) // fetch the file extension
        const allowedExtension = ['.png', '.jpg', '.jpeg']

        if (!allowedExtension.includes(extensionName)) {
          return res.status(422).send('Invalid Image')
        }

        file.name = req.signedCookies.ssid + extensionName

        const filePath = path.join(__dirname, '../../public/img/avatar/' + file.name)
        
        file.mv(filePath, (err) => {
          if (err) {
            return res.status(500).send(err)
          }
          avatarToSave = file.name
        })
      }
      let user = req.body
      try {
        const currentUser = await findUserById(req.signedCookies.ssid)
        if (!currentUser) {
          return
        }
        if (!user.name) {
          let error = encodeURI('Name property not be null')
          res.status(401).redirect('/profile?error=' + error)
          return
        }
        if (!user.username) {
          let error = encodeURI('Username property not be null')
          res.status(401).redirect('/profile?error=' + error)
          return
        }
        if (typeof user.name !== 'string') {
          let error = encodeURI('Name property must be a string')
          res.status(401).redirect('/profile?error=' + error)
          return
        }
        if (typeof user.username !== 'string') {
          let error = encodeURI('Username property must be a string')
          res.status(401).redirect('/profile?error=' + error)
          return
        }
        user.avatar = avatarToSave ? avatarToSave : currentUser.avatar
        await updateUser(req.signedCookies.ssid, user.username, user.name, user.avatar)
        let state = encodeURI('Profile updated successfully!')
        res.redirect('/profile?success=' + state)
      } catch (e) {
        console.error(e)
        res.status(500).send('Internal Server Error')
      }
    }
  )
}

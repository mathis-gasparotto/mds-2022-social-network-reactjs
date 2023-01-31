import { Application } from 'express-ws'
import path from 'path'
import bodyParser from 'body-parser'
import { findUserById, updateUser } from '../../repositories/userRepository'
import fileUpload from 'express-fileupload'

export function postProfile(app: Application) {
  app.post(
    '/profile',
    bodyParser.urlencoded(),
    fileUpload({
      limits: {
        fileSize: 8 * (1024 * 1024), // max 8 MB
      },
      abortOnLimit: true,
    }),
    async (req, res) => {
      if (req.files) {
        const file = req.files.avatar

        const extensionName = path.extname(file.name) // fetch the file extension
        const allowedExtension = ['.png', '.jpg', '.jpeg']

        if (!allowedExtension.includes(extensionName)) {
          return res.status(422).send('Invalid Image')
        }

        const filePath = '/img/avatar/' + file.name

        file.mv(filePath, (err) => {
          if (err) {
            return res.status(500).send(err)
          }
          console.log(filePath)
        })
      }
      // let user = req.body
      // try {
      //   if (!user.name) {
      //     let error = encodeURI('Name property not be null')
      //     res.status(401).redirect('/profile?error=' + error)
      //     return
      //   }
      //   if (!user.username) {
      //     let error = encodeURI('Username property not be null')
      //     res.status(401).redirect('/profile?error=' + error)
      //     return
      //   }
      //   if (typeof user.name !== 'string') {
      //     let error = encodeURI('Name property must be a string')
      //     res.status(401).redirect('/profile?error=' + error)
      //     return
      //   }
      //   if (typeof user.username !== 'string') {
      //     let error = encodeURI('Username property must be a string')
      //     res.status(401).redirect('/profile?error=' + error)
      //     return
      //   }
      //   if (!user.avatar) {
      //     const currentUser = await findUserById(req.signedCookies.ssid)
      //     if (currentUser) {
      //       user.avatar = currentUser.avatar
      //     }
      //   } else {
      //     user.avatar = '/img/avatar/' + user.avatar
      //   }
      //   await updateUser(req.signedCookies.ssid, user.username, user.name)
      //   let state = encodeURI('Profile updated successfully!')
      //   res.redirect('/profile?success=' + state)
      // } catch (e) {
      //   console.error(e)
      //   res.status(500).send('Internal Server Error')
      // }
    }
  )
}

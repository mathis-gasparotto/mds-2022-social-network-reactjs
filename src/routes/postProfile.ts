import { Application } from 'express-ws'
import bodyParser from 'body-parser'
import { updateUser } from '../../repositories/userRepository'

export function postProfile(app: Application) {
  app.post('/profile', bodyParser.urlencoded(), async (req, res) => {
    try {
      let user = req.body
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
      await updateUser(req.signedCookies.ssid, user.username, user.name)
      let state = encodeURI('Profile updated successfully!')
      res.redirect('/profile?success=' + state)
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  })
}

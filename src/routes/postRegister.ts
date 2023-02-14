import bodyParser from 'body-parser'
import { Application } from 'express-ws'
import {
  createUser,
  generateExpiresDateLoginCookie,
} from '../../repositories/userRepository'
import { guestMiddleware } from '../middlewares/guest'

export function postRegister(app: Application) {
  app.post('/register', guestMiddleware, bodyParser.urlencoded(), async (req, res) => {
    try {
      const { username, name } = req.body
      if (!username || !name) {
        res.redirect('/register?error=' + encodeURI('Invalid values'))
        return
      }
      const user = await createUser(username, name)
      if (!user) {
        const error = encodeURI('Username already used')
        res.status(422).redirect('/register?error=' + error)
        return
      }
      res.cookie('ssid', user.id, {
        signed: true,
        httpOnly: true,
        expires: generateExpiresDateLoginCookie(),
        sameSite: true,
      })
      res.status(200).redirect('/')
    } catch (e) {
      console.error(e)
      const error = encodeURI('Internal Server Error')
      res.status(500).redirect('/register?error=' + error)
    }
  })
}

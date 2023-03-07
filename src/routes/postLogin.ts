import { Application } from 'express-ws'
import bodyParser from 'body-parser'
import {
  findUserByUsername,
  generateExpiresDateLoginCookie,
} from '../repositories/userRepository'
import { guestMiddleware } from '../middlewares/guest'

export function postLogin(app: Application) {
  app.post(
    '/api/v1/login',
    guestMiddleware,
    bodyParser.json(),
    async (req, res) => {
      try {
        const user = await findUserByUsername(req.body.username)
        if (!user) {
          res.status(401).send({
            message: 'Invalid username',
          })
          // let error = encodeURI('Invalid username')
          // res.status(401).redirect('/login?error=' + error)
          return
        }
        res.cookie('ssid', user.id, {
          signed: true,
          httpOnly: true,
          expires: generateExpiresDateLoginCookie(),
          sameSite: true,
        })
        // res.redirect('/')
        res.status(204).send({})
      } catch (e) {
        console.error(e)
        res.status(500).send({
          message: 'Internal Server Error',
        })
        // const error = encodeURI('Internal Server Error')
        // res.status(500).send('/login?error=' + error)
      }
    }
  )
}

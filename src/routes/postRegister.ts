import bodyParser from 'body-parser'
import { Application } from 'express-ws'
import {
  createUser,
  generateExpiresDateLoginCookie,
} from '../repositories/userRepository'
// import { guestMiddleware } from '../middlewares/guest'

export function postRegister(app: Application) {
  app.post(
    '/api/v1/register',
    // guestMiddleware,
    bodyParser.json(),
    async (req, res) => {
      try {
        const { username, name } = req.body
        if (!username || !name) {
          res.status(400).send('Invalid values')
          // const error = encodeURI('Invalid values')
          // res.status(400).redirect('/register?error=' + error)
          return
        }
        const user = await createUser(username, name)
        if (!user) {
          res.status(422).send('Username already used')
          // const error = encodeURI('Username already used')
          // res.status(422).redirect('/register?error=' + error)
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
        res.status(500).send('Internal Server Error')
        // const error = encodeURI('Internal Server Error')
        // res.status(500).redirect('/register?error=' + error)
      }
    }
  )
}

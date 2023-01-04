import bodyParser from "body-parser"
import { Application } from "express-ws"
import { createUser, generateExpiresDateLoginCookie } from "../../repositories/userRepository"

export function postRegister (app: Application) {
  app.post('/register', bodyParser.urlencoded(), async (req, res) => {
    try {
      const {username, name} = req.body
      if (!username || !name) {
        res.redirect('/register?error=' + encodeURI('Invalid values'))
        return
      }
      const user = await createUser(username, name)
      if(!user) {
        res.status(400).redirect('/register?error=' + encodeURI('Username already used'))
        return
      }
      res.cookie('ssid', user.id, { signed: true, httpOnly: true, expires: generateExpiresDateLoginCookie(), sameSite: true })
      res.redirect('/')
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  })
}
import { Application } from "express-ws"
import bodyParser from "body-parser"
import { findUserByUsername, generateExpiresDateLoginCookie } from "../../repositories/userRepository"
import { guestMiddleware } from "../middlewares/guest"

export function postLogin (app: Application) {
  app.post('/login', guestMiddleware, bodyParser.urlencoded(), async (req, res) => {
    try {
      const user = await findUserByUsername(req.body.username)
      if (!user) {
        let error = encodeURI('Invalid username')
        res.status(401).redirect('/login?error=' + error)
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
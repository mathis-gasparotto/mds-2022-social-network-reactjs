import { Application } from 'express-ws'
import path from 'path'

export function getChat(app: Application) {
  app.get('/', (req, res) => {
    if(!req.signedCookies.ssid) {
      res.redirect('/login')
      return
    }
    res.sendFile(path.join(__dirname, '../../pages/index.html'))
  })
}
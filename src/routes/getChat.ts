import { Application } from 'express-ws'
import path from 'path'

export function getChat(app: Application) {
  app.get('/chat', (req, res) => {
    if (!req.signedCookies.ssid) {
      res.redirect('/login')
      return
    }
    res.render(path.join(__dirname, '../views/chat/index.ejs'))
  })
}

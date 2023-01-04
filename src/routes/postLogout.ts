import { Application } from "express-ws"

export function postLogout (app: Application) {
  app.post('/logout', (req, res) => {
    res.clearCookie('ssid')
    res.redirect('/login')
    return
  })
}
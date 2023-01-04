import { Application } from "express-ws"

export function getLogout (app: Application) {
  app.get('/logout', (req, res) => {
    res.clearCookie('ssid')
    res.redirect('/login')
    return
  })
}
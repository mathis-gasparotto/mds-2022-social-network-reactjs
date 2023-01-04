import { Application } from "express-ws"
import path from 'path'
import { guestMiddleware } from "../middlewares/guest"

export function getLogin (app: Application) {
  app.get('/login', guestMiddleware, (req, res) => {
    
    res.sendFile(path.join(__dirname, '../../pages/login/index.html'))
  })
}
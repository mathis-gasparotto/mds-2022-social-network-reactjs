import { Application } from "express-ws"
import path from 'path'

export function getRoot (app: Application) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
  })
}
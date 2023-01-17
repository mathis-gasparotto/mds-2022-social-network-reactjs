import expressWs, { Application } from 'express-ws'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { getLogin } from './routes/getLogin'
import { postLogin } from './routes/postLogin'
import { getChat } from './routes/getChat'
import { getWsPost } from './routes/getWsPost'
import { postLogout } from './routes/postLogout'
import { authMiddleware } from './middlewares/auth'
import { getRegister } from './routes/getRegister'
import { postRegister } from './routes/postRegister'
import { getRoot } from './routes/getRoot'

function main() {
  const app = express() as unknown as Application
  expressWs(app)
  const sockets = new Map()

  app.use(express.static(path.join(__dirname, '../public')))
  app.use(cookieParser(process.env.SECRET_KEY))

  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'index.html'))
  // })

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authMiddleware)
  getRoot(app)
  getChat(app)
  getWsPost(app, sockets)
  postLogout(app)

  app.listen(3000, () => {
    console.log('App listenning on http://localhost:3000/')
  })
}

main()
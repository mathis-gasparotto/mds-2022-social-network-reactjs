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
// import open from 'open'
import { getWsChat } from './routes/getWsChat'
import { getProfile } from './routes/getProfile'
import { postProfile } from './routes/postProfile'
import { postDeleteAccount } from './routes/postDeleteAccount'
import { postPost } from './routes/postPost'

function main() {
  const app = express() as unknown as Application
  expressWs(app)
  const sockets = new Map()

  app.use(express.static(path.join(__dirname, '../public')))
  app.use(cookieParser(process.env.SECRET_KEY))

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authMiddleware)
  getRoot(app)
  getChat(app)
  getProfile(app)
  postProfile(app)
  postPost(app)
  getWsPost(app, sockets)
  getWsChat(app, sockets)
  postLogout(app)
  postDeleteAccount(app)

  app.listen(3000, () => {
    console.log('App listenning on http://localhost:3000/')
    // open('http://localhost:3000/')
  })
}

main()

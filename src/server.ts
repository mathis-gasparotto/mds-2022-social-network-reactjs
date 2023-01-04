import expressWs, { Application } from 'express-ws'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import { getLogin } from './routes/getLogin'
import { postLogin } from './routes/postLogin'
import { getChat } from './routes/getChat'
import { getWs } from './routes/getWs'
import { getLogout } from './routes/getLogout'
import { authMiddleware } from './middlewares/auth'
import { getRegister } from './routes/getRegister'
import { postRegister } from './routes/postRegister'

const SECRET_KEY = "^x&+r=lz0k0rex5!beuvri4#7a9!ugm371i_-yt-g=czior_7v"

function main() {
  const app = express() as unknown as Application
  expressWs(app)
  const sockets = new Map()

  app.use(express.static(path.join(__dirname, '../public')))
  app.use(cookieParser(SECRET_KEY))

  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'index.html'))
  // })

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authMiddleware)
  getChat(app)
  getWs(app, sockets)
  getLogout(app)

  app.listen(3000, () => {
    console.log('Example app listenning on port 3000')
  })
}

main()
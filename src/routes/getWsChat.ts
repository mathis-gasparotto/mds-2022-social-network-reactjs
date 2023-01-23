import { Application } from 'express-ws'
import { WebSocket } from 'ws'
import { findUserById, sendName } from '../../repositories/userRepository'

export function getWsChat(app: Application, sockets: Map<string, WebSocket>) {
  app.ws('/ws-chat', async (ws, req) => {
    const user = await findUserById(req.signedCookies.ssid)
    if (!user) {
      ws.close()
      return
    }
    sendName(user, ws, sockets)
    ws.on('message', (msg) => {
      sockets.forEach((socket) => {
        const jsonParsed = JSON.parse(msg.toString())
        if (jsonParsed.type === 'message') {
          if (socket !== ws) {
            socket.send(
              JSON.stringify({
                type: 'message',
                data: {
                  name: user.name,
                  isMe: false,
                  msg: jsonParsed.data.msg,
                },
              })
            )
          } else {
            socket.send(
              JSON.stringify({
                type: 'message',
                data: {
                  name: 'Me',
                  isMe: true,
                  msg: jsonParsed.data.msg,
                },
              })
            )
          }
        }
      })
    })
    ws.on('close', () => {
      sockets.delete(user.id)
    })
  })
}

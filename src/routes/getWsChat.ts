import { Application } from 'express-ws'
import { WebSocket } from 'ws'
import { createMessage } from '../repositories/chatRepository'
import { findUserById, sendName } from '../repositories/userRepository'

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
          let dataToSend = {
            type: 'message',
            data: {
              name: user.name,
              isMe: false,
              msg: jsonParsed.data.msg,
            },
          }
          if (socket === ws) {
            dataToSend.data.isMe = true
            createMessage(user.id, jsonParsed.data.msg)
          }
          socket.send(JSON.stringify(dataToSend))
        }
      })
    })
    ws.on('close', () => {
      sockets.delete(user.id)
    })
  })
}

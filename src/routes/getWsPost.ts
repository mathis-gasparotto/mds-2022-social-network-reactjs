import { Application } from 'express-ws'
import { WebSocket } from 'ws'
import { createPost } from '../repositories/postRepository'
import { findUserById, sendName } from '../repositories/userRepository'

export function getWsPost(app: Application, sockets: Map<string, WebSocket>) {
  app.ws('/ws-post', async (ws, req) => {
    const user = await findUserById(req.signedCookies.ssid)
    if (!user) {
      ws.close()
      return
    }
    sendName(user, ws, sockets)
    ws.on('message', (msg) => {
      sockets.forEach((socket) => {
        const jsonParsed = JSON.parse(msg.toString())
        if (jsonParsed.type === 'post') {
          if (socket === ws) {
            createPost(user.id, jsonParsed.data.content, jsonParsed.data.image)
          }
          socket.send(
            JSON.stringify({
              type: 'post',
              data: {
                author: user.name,
                createdAt: new Date(),
                content: jsonParsed.data.content,
                image: jsonParsed.data.image,
              },
            })
          )
        }
      })
    })
    ws.on('close', () => {
      sockets.delete(user.id)
    })
  })
}

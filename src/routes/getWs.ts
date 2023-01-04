import { Application } from "express-ws"
import { WebSocket } from "ws"
import { createPost } from "../../repositories/postRepository"
import { findUserById } from "../../repositories/userRepository"

export function getWs (app: Application, sockets: Map<string, WebSocket>) {
  app.ws('/ws', async (ws, req) => {
    const user = await findUserById(req.signedCookies.ssid)
    if (!user) {
      ws.close()
      return
    }
    sockets.set(user.id, ws)
    ws.send(JSON.stringify({
      type: "setName",
      data: user.name
    }))
    ws.on('message', (msg) => {
      sockets.forEach((socket) => {
        const jsonParsed = JSON.parse(msg.toString())
        if (jsonParsed.type === 'message') {
          if (socket !== ws) {
            socket.send(JSON.stringify({
              type: 'message',
              data: {
                name: user.name,
                isMe: false,
                msg: jsonParsed.data.msg
              }
            }))
          } else {
            socket.send(JSON.stringify({
              type: 'message',
              data: {
                name: 'Me',
                isMe: true,
                msg: jsonParsed.data.msg
              }
            }))
          }
        }
        if (jsonParsed.type === 'post') {
          if (socket === ws) {
            createPost(user.id, jsonParsed.data.content)
          }
          socket.send(JSON.stringify({
            type: 'post',
            data: {
              author: user.name,
              content: jsonParsed.data.content
            }
          }))
        }
      })
    })
    ws.on('close', () => {
      sockets.delete(user.id)
    })
  })
}
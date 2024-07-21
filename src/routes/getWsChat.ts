import { Application } from 'express-ws'
import { WebSocket } from 'ws'
import { createMessage, getAllMessages } from '../repositories/chatRepository'
import { findUserById, sendName } from '../repositories/userRepository'

export function getWsChat(app: Application, sockets: Map<string, WebSocket>) {
  app.ws('/ws-chat', async (ws, req) => {
    const user = await findUserById(req.signedCookies.ssid)
    if (!user) {
      ws.close()
      return
    }
    sendName(user, ws, sockets)
    getAllMessages().then((messages) => {
      const messagesData = messages.map(async(msg) =>  {
        return {
          ...msg,
          author: await findUserById(msg.authorId)?.then((user) => user?.name),
          isMe: msg.authorId === user.id,
        }
      })
      Promise.all(messagesData).then((data) => {
        ws.send(JSON.stringify({ type: 'oldMessages', data }))
      })
    })
    ws.on('message', (msg) => {
      sockets.forEach((socket) => {
        const jsonParsed = JSON.parse(msg.toString())
        if (jsonParsed.type === 'message') {
          let dataToSend = {
            type: 'message',
            data: {
              id: jsonParsed.data.id,
              author: user.name,
              isMe: false,
              content: jsonParsed.data.msg,
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

import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatWrapper } from './ChatWrapper'

export type Message = {
  id: string
  author: string
  isMe: boolean
  content: string
  createdAt: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [connected, setConnected] = useState(false)

  const scrollToBottom = () => {
    const messageList = document.getElementById('message-list')
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight
    }
  }
  
  const wsRef = useRef<WebSocket>()
  useEffect(() => {
    const url = new URL('/ws-chat', window.origin)
    url.protocol = 'ws:'
    wsRef.current = new WebSocket(url)
    wsRef.current.onopen = () => {
      setConnected(true)
      console.log('Connected')
    }
    wsRef.current.onclose = () => {
      setConnected(false)
      console.log('Disconnected')
    }
    wsRef.current.addEventListener('message', event => {
      const message = JSON.parse(event.data)
      if (message.type === 'message') {
        const messageData = message.data  as Message
        setMessages(oldMessages => [...oldMessages, messageData])
      }
      if (message.type === 'oldMessages') {
        const oldMessages = message.data  as Message[]
        setMessages(oldMessages)
      }
      if (message.type === 'setName') {
        setUserName(message.data)
      }
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    })
    
  }, [])

  return (
    <>
      <ChatWrapper userName={userName} connected={connected}>
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              id={message.id}
              author={message.author}
              message={message.content}
              isOwnMessage={message.isMe}
              timestamp={new Date(message.createdAt).getTime()}
            />
          ))}
      </ChatWrapper>
      <form
        onSubmit={event => {
          event.preventDefault()
          wsRef.current?.send(JSON.stringify({
            type: 'message',
            data: {
              msg: message,
            },
          }))
          setMessage('')
        }}
      >
        <input type="text" value={message} onChange={event => setMessage(event.currentTarget.value)} />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

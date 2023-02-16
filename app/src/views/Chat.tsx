import { ChatMessage } from '../components/Chat/ChatMessage'
import { ChatWrapper } from '../components/Chat/ChatWrapper'

export function Chat() {
  return (
    <>
      <h1>Chat</h1>
      <ChatWrapper>
        <ChatMessage 
          author='Moa'  
          message='Wsh'
          isOwnMessage
          timestamp={Date.now()}
        />
        <ChatMessage 
          author='Pas moa'  
          message='Ca va le sang'
          timestamp={Date.now()}
        />
        <ChatMessage 
          author='Moa'  
          message='Vi'
          isOwnMessage
          timestamp={Date.now()}
        />
        <ChatMessage 
          author='Pas moa'  
          message='Oui'
          timestamp={Date.now()}
        />
      </ChatWrapper>
    </>
  )
}
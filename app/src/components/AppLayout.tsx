import { Outlet } from 'react-router'
import { Chat } from './Chat/Chat'
import { ChatMessage } from './Chat/ChatMessage'
import { ChatWrapper } from './Chat/ChatWrapper'
import { Header } from './layouts/Header'

export function AppLayout() {
  return (
    <>
      <Header/>
      <Outlet/>

      <div className="chatPopup">
        <Chat />
      </div>

    </>
  )
}
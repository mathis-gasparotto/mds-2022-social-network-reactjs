import { Outlet } from "react-router";
import { ChatMessage } from "./Chat/ChatMessage";
import { ChatWrapper } from "./Chat/ChatWrapper";
import { Header } from "./layouts/Header";

export function AppLayout() {
  return (
    <>
      <Header/>
      <Outlet/>

      <div className="chatPopup">
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
      </div>

    </>
  )
}
import { ReactNode } from 'react'

type ChatWrapperProps = {
  connected: boolean,
  userName: string,
  children: ReactNode,
  style?: object
}

export function ChatWrapper(props: ChatWrapperProps) {
  const style = {
    ...props.style,
    backgroundColor : '#fff'
  }
  return (
    <div className="message-list-container" style={style}>
      
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
        <div id="server-status" style={{backgroundColor: props.connected ? 'green' : 'red'}}></div>
        <p id="connected">Connected as:
          {props.userName &&
            <b> {props.userName}</b>
          }
        </p>
      </div>

      <ul id="message-list" style={{height: 350}}>
        {props.children}
      </ul>
    </div>
  )
}
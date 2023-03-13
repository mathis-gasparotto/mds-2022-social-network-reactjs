import { ReactNode } from 'react'

type ChatWrapperProps = {
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
      <ul id="message-list">
        {props.children}
      </ul>
    </div>
  )
}
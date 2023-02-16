import React, { ReactNode } from "react";

type ChatWrapperProps = {
  children: ReactNode,
  style?: object
}

export function ChatWrapper(props: ChatWrapperProps) {
  let style = props.style || {}
  style.backgroundColor = '#fff'
  return (
    <div className="message-list-container" style={props.style}>
      <ul id="message-list">
        {props.children}
      </ul>
      <form id="message-form">
        <input type="text" name="msg" id="msg" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
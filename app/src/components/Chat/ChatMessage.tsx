import classNames from 'classnames'

export function ChatMessage({
  message,
  author,
  timestamp,
  isOwnMessage,
}:  {
  message: string
  author: string
  timestamp: number
  isOwnMessage?: boolean
}) {
  return (
    <li className={classNames('single-message', isOwnMessage ? 'message-sent' : 'message-received')}>
      <b style={{display: 'block'}}>{author}</b>
      {message}
    </li>
  )
}
import classNames from 'classnames'

export function ChatMessage({
  id,
  message,
  author,
  timestamp,
  isOwnMessage,
}:  {
  id: string
  message: string
  author: string
  timestamp: number
  isOwnMessage?: boolean
}) {
  return (
    <li key={id} className={classNames('single-message', isOwnMessage ? 'message-sent' : 'message-received')}>
      <b style={{display: 'block'}}>{author}</b>
      {message}
    </li>
  )
}
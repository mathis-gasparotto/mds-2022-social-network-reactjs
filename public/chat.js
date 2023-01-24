const serverStatus = document.querySelector('#server-status')

function addMessage(msg, className) {
  const message = document.createElement('li')
  message.classList.add(className, 'single-message')
  message.innerHTML = msg
  document.querySelector('#message-list').appendChild(message)
}

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws-chat')
  ws.onopen = () => {
    console.log('Connected')
    serverStatus.style.backgroundColor = 'green'
  }
  ws.onclose = () => {
    console.log('Diconnected')
    serverStatus.style.backgroundColor = 'red'
    setTimeout(connect, 1000)
  }
  ws.onerror = (error) => {
    console.error('Error! ', error)
  }
  ws.onmessage = (event) => {
    const jsonParsed = JSON.parse(event.data)
    const userNameTag = document.querySelector('#connected .display-username')
    if (jsonParsed.type === 'setName' && !userNameTag) {
      const userName = document.createElement('b')
      userName.classList.add('display-username')
      userName.innerText = jsonParsed.data
      document.querySelector('#connected').appendChild(userName)
      return
    }
    if (jsonParsed.type === 'message' && jsonParsed.data.isMe) {
      addMessage(jsonParsed.data.msg, 'message-sent')
      return
    }
    if (jsonParsed.type === 'message') {
      addMessage(
        '<b style="display: block;">' + jsonParsed.data.name + '</b>' + jsonParsed.data.msg,
        'message-received'
      )
      return
    }
  }
}

connect()

const messageForm = document.querySelector('#message-form')
if (messageForm) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.querySelector('#message-form #msg')
    if (input.value.length === 0) {
      return
    }
    ws.send(
      JSON.stringify({
        type: 'message',
        data: {
          msg: input.value,
        },
      })
    )
    input.value = ''
  })
}

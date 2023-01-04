const serverStatus = document.querySelector('#server-status')

function addMessage(msg, className) {
  const message = document.createElement('li')
  message.classList.add(className)
  message.innerText = msg
  document.querySelector('#message-list').appendChild(message)
}

function addPost(author, content) {
  const post = document.createElement('li')
  post.classList.add('post')
  post.innerText = author + ': ' + content
  document.querySelector('#post-list').appendChild(post)
}

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws')
  ws.onopen = () => {
    console.log('Connected')
    serverStatus.style.backgroundColor = 'green'
    // document.querySelector('#connected').innerText = 'Connected as: ' + event.data
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
    if(jsonParsed.type === "setName") {
      const userName = document.createElement('b')
      userName.innerText = jsonParsed.data
      document.querySelector('#connected').appendChild(userName)
      return
    }
    if (jsonParsed.type === "message" && jsonParsed.data.isMe) {
      addMessage(jsonParsed.data.msg, 'message-send')
      return
    }
    if(jsonParsed.type === "message") {
      addMessage(jsonParsed.data.name + ': ' + jsonParsed.data.msg, 'message-received')
      return
    }
    if(jsonParsed.type === "post") {
      addPost(jsonParsed.data.author, jsonParsed.data.content)
      return
    }
  }
}

connect()

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.querySelector('#message-form #msg')
  if (input.value.length === 0) {
    return
  }
  ws.send(JSON.stringify({
    type: "message",
    data: {
      msg: input.value
    }
  }))
  input.value = ''
})

document.querySelector('#post-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.querySelector('#post-form #content')
  if (input.value.length === 0) {
    return
  }
  ws.send(JSON.stringify({
    type: "post",
    data: {
      content: input.value
    }
  }))
  input.value = ''
})
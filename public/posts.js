const serverStatus = document.querySelector('#server-status')

function addPost(author, content) {
  const post = document.createElement('li')
  post.classList.add('post')
  post.innerHTML =
    '<b style="display: block">' +
    author +
    '</b>' +
    content.replace(/\n/gi, '<br>')
  const container = document.querySelector('#post-list')
  container.insertBefore(post, container.firstChild)
}

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws-post')
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
    if (jsonParsed.type === 'post') {
      addPost(jsonParsed.data.author, jsonParsed.data.content)
      return
    }
  }
}

connect()

// const postForm = document.querySelector('#post-form')
// if (postForm) {
//   postForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const input = document.querySelector('#post-form #content')
//     if (input.value.length === 0) {
//       return
//     }
    
//     input.value = ''
//   })
// }

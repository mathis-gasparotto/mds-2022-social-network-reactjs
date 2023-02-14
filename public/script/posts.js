const serverStatus = document.querySelector('#server-status')

function addPost(author, date, content, image = null) {
  const postElem = document.createElement('li')
  postElem.classList.add('single-post')
  const authorElem = document.createElement('div')
  authorElem.classList.add('single-post-author')
  authorElem.innerText = author
  const dateElem = document.createElement('div')
  dateElem.classList.add('single-post-date')
  const dateObject = new Date(date)
  dateElem.innerText = dateObject.toLocaleString('fr-FR', {
    day: 'numeric',
    year: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
  const contentElem = document.createElement('div')
  contentElem.classList.add('single-post-content')
  contentElem.innerHTML = content.replace(/\n/gi, '<br>')
  postElem.appendChild(authorElem)
  postElem.appendChild(dateElem)
  postElem.appendChild(contentElem)
  if (image) {
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('single-post-image-container')
    const imageElem = document.createElement('img')
    imageElem.classList.add('single-post-image')
    imageElem.setAttribute('src', image)
    imageElem.setAttribute('alt', image)
    imageContainer.appendChild(imageElem)
    postElem.appendChild(imageContainer)
  }
  const container = document.querySelector('#post-list')
  container.insertBefore(postElem, container.firstChild)
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
      addPost(
        jsonParsed.data.author,
        jsonParsed.data.date,
        jsonParsed.data.content,
        jsonParsed.data.image
      )
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
//   ws.send(
//     JSON.stringify({
//       type: 'post',
//       data: {
//         content: input.value,
//       },
//     })
//   )
//     input.value = ''
//   })
// }

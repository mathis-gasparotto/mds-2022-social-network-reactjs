const root = document.getElementById('root');



function App(){
  return(
    <React.Fragment>
      <h1>My chat app</h1>
      <i id="chat-status"></i>
      <div id="message-list"></div>
      <ChatForm onSendMessage={message => console.log(message)}/>
    </React.Fragment>
  )
}

ReactDOM.render(<App/>, root)
export function Header(){
  return(
    <React.Fragment>
      <header class="header">
        <nav class="navbar">
          <ul class="nav-items">
            <li class="nav-item">
              <a href="/" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a href="/chat" class="nav-link">Chat</a>
            </li>
            <li class="nav-item">
              <a href="/profile" class="nav-link">My Account</a>
            </li>
            <li class="nav-item">
              <form action="/logout" method="POST">
                <button type="submit" class="nav-link">Disconnect</button>
              </form>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  )
}
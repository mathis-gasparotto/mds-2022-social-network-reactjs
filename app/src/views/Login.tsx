import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

export function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  return (
    <main className="main">

      <h1>Login</h1>

      <div className="login-forms">
        <div className="single-form">
          <form id="login-form" onSubmit={ async (event) => {
            event.preventDefault()
            try {
              const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username})
              })
              const data = await response.json()
              if (response.status >= 400 && response.status < 500) {
                setError(data.message)
                return
              }
              if (response.status >= 500) {
                setError(data.message)
                return
              }
            } catch (e) {
              if (e instanceof Error) {
                setError(e.message)
                console.error(e)
              }
              return
            }
            navigate('/')
          }}>
            <input type="text" name="username" id="username" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            {error && 
              <Alert state="danger" message={error}/>
            }
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      <p>You don't have an account? <Link to="/register">Go to Register Form</Link></p>

    </main>
  )
}
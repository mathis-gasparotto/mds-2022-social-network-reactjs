import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

export function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)

  return(
    <main className="main">

      <h1>Register</h1>

      <div className="login-forms">
        <div className="single-form">
          <form id="register-form" onSubmit={ async (event) => {
            event.preventDefault()
            try {
              const response = await fetch('/api/v1/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, name})
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
              }
              return
            }
            navigate('/')
          }}>
            <input type="text" name="username" id="username" value={username} placeholder="Your username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" name="name" id="name" value={name} placeholder="Your name" onChange={(e) => setName(e.target.value)} />
            <button type="submit">Register</button>
            {error && <Alert state='danger' message={error}/>}
          </form>
        </div>
      </div>

      <p>Have already an account? <Link to="/login">Go to Login Form</Link></p>

    </main>
  )
}
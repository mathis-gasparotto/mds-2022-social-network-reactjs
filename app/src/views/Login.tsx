import { useState } from "react"
import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom"
import { Alert } from "../components/Alert"
import { fetchWithErrorHandling } from "../helpers/fetchWithErrorHandling"

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await fetchWithErrorHandling('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: formData.get('username') }),
  })
  return redirect('/')
}

export function Login() {
  const [error, setError] = useState<string | null>(null)
  
  return (
    <main className="main">

      <h1>Login</h1>

      <div className="login-forms">
        <div className="single-form">
          <Form method="post">
            <input type="text" name="username" id="username" placeholder="Your username" />
            {error && 
              <Alert state="danger" message={error}/>
            }
            <button type="submit">Login</button>
          </Form>
        </div>
      </div>

      <p>You don't have an account? <Link to="/register">Go to Register Form</Link></p>

    </main>
  )
}
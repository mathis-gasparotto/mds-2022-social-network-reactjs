import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Footer } from "./components/layouts/Footer";
import { Login } from "./views/Login";
import { Post } from "./views/Post";
import { Register } from "./views/Register";
import './assets/style/main.css'
import { Chat } from "./views/Chat";
import { ErrorPage } from "./views/ErrorPage";
import { AppLayout } from "./components/AppLayout";

const router = createBrowserRouter( [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    errorElement: <ErrorPage/>,
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        loader: async () => {
          const response = await fetch('/api/v1/posts')
          if (response.status === 401) {
            throw new Response(
              'Unauthorized', {status: 401}
            )
          }
          return await response.json()
        },
        element: <Post/>
      },
      {
        path: '/chat',
        element: <Chat />
      },
    ]
  },
])

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer/>
    </>
  )
}
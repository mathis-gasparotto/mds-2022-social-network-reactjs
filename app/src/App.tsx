import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Footer } from './components/layouts/Footer'
import { Login, loginAction } from './views/Login'
import { addPostAction, feedLoader, Post } from './views/Post'
import { Register, registerAction } from './views/Register'
import './assets/style/main.css'
import { ChatView } from './views/ChatView'
import { ErrorPage } from './views/ErrorPage'
import { AppLayout } from './components/AppLayout'
import {
  deleteUserProfileAction,
  updateUserProfileAction,
  userProfileLoader,
} from './views/UserProfile/UserProfileForm'
import { addEventAction, Events, eventsLoader } from './views/Events'
import { UserProfile } from './views/UserProfile/UserProfile'
import { UserProfileError } from './views/UserProfile/UserProfileError'
import { deleteEventAction, Event, eventLoader, updateEventAction } from './views/Event'

const router = createBrowserRouter( [
  {
    path: '/login',
    action: loginAction,
    element: <Login />
  },
  {
    path: '/register',
    action: registerAction,
    element: <Register />
  },
  {
    path: '/',
    errorElement: <ErrorPage/>,
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        // loader: feedLoader,
        action: addPostAction,
        element: <Post/>
      },
      {
        path: '/chat',
        element: <ChatView />
      },
      {
        path: '/profile',
        loader: userProfileLoader,
        action: updateUserProfileAction,
        element: <UserProfile />,
        errorElement: <UserProfileError />,
        children: [
          {
            path: '/profile/delete',
            action: deleteUserProfileAction,
            errorElement: <div>Oops, cannot delete account</div>,
          },
        ],
      },
      {
        path: '/events',
        loader: eventsLoader,
        action: addEventAction,
        element: <Events />,
      },
      {
        path: '/events/:eventId',
        loader: eventLoader,
        action: updateEventAction,
        element: <Event />,
        children: [
          {
            path: '/events/:eventId/delete',
            action: deleteEventAction,
            errorElement: <div>Oops, cannot delete event</div>,
          },
        ],
      }
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
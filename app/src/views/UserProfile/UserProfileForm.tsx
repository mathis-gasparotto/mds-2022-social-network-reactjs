import { Form, Outlet, redirect } from 'react-router-dom'
import { fetchWithErrorHandling } from '../../helpers/fetchWithErrorHandling'
import { ActionFunctionArgs } from '@remix-run/router/utils'
import { Alert } from '../../components/Alert'

export type UserProfileData = { id: number; name: string; username: string, avatar: string }

export async function userProfileLoader() {
  const response = await fetch('/api/v1/profile')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as UserProfileData
}

export async function updateUserProfileAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const updatedUser = await fetchWithErrorHandling('/api/v1/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: formData.get('username'),
      name: formData.get('name'),
      avatar: formData.get('avatar')
    }),
  })

  return { user: updatedUser }
}

export async function deleteUserProfileAction() {
  await fetchWithErrorHandling('/api/v1/profile', {
    method: 'DELETE',
  })
  return redirect('/login')
}

export function UserProfileForm({ error, data }: { error?: Error; data?: UserProfileData }) {
  if (!data && !error) {
    throw new Error('No data')
  }

  return (
    <div>
      <ul className="profile_data_list">
        <li className="profile_data_item">
          <span className="label">Name</span>
          <span className="data">{data?.name}</span>
        </li>
        <li className="profile_data_item">
          <span className="label">Username</span>
          <span className="data">{data?.username}</span>
        </li>
        <li className="profile_data_item">
          <span className="label">Avatar</span>
          <span className="data"><img src={'/img/avatar/' + data?.avatar} alt={data?.username + '-avatar'} className="user-avatar" /></span>
        </li>
      </ul>
    
      <h2>Edit your profile data</h2>
      
      <Form method="put" className="profile_form" encType="multipart/form-data">
        <div className="row">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" placeholder="Name" defaultValue={data?.name} />
        </div>
        <div className="row">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" placeholder="Username" defaultValue={data?.username} />
        </div>
        <div className="row">
          <label htmlFor="avatar">New Avatar (void for no update) (max 8 MB): </label>
          <input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg, image/jpg" />
        </div>
        {error && 
          <Alert state="danger" message={error.toString()}/>
        }
        <button type="submit" className="btn">Submit</button>
      </Form>
      
      <Form action="delete" method="delete" className="delete-account-form">
        <button type="submit" className="btn btn-danger">Delete Account</button>
      </Form>
      <Outlet />
    </div>
  )
}

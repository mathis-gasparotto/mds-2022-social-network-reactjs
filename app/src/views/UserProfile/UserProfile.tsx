import { useLoaderData } from 'react-router-dom'
import { UserProfileData, UserProfileForm } from './UserProfileForm'

export const UserProfile = () => {
  const data = useLoaderData() as UserProfileData
  return <UserProfileForm data={data} />
}

import { useRouteError } from 'react-router-dom'
import { UserProfileForm } from './UserProfileForm'

export const UserProfileError = () => {
  const error = useRouteError()

  if (!(error instanceof Error)) {
    throw error
  }

  return <UserProfileForm error={error} />
}

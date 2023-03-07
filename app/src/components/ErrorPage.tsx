import {useNavigate, useRouteError} from "react-router-dom";
import {useEffect} from "react";

export function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  // Use a useEffect here to avoid an infinite loop
  useEffect(() => {
    if (
      // Check that the error is of type object
      typeof error === 'object' &&
      // Since null is considered an object, we need to check that it is not null
      error !== null &&
      // Check that the error has a status property
      'status' in error &&
      // Check that the status is 401
      error.status === 401
    ) {
      // Redirect to login
      navigate("/login")
    }
  }, [])

  return (
    <>
      <h1>Error</h1>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    </>
  )
}

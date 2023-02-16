import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      error.status === '401'
    ) {
      navigate('login')
    }
  }, [])

  return(
    <>
      <h1>Error</h1>
      <p>{error instanceof Error ? error.message : 'Unknow error'}</p>
    </>
  )
}
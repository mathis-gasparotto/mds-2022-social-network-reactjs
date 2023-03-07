export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  const data = await response.json()
  if (response.status >= 400 && response.status < 500) {
    // User input was incorrect or email already used
    throw new Error(data.message)
  }
  if (response.status >= 500) {
    // Something went wrong on the server that is not related to the user
    throw new Error('Something went wrong')
  }
  return data
}

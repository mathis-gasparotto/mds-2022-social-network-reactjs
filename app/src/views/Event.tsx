import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'
import { useState } from 'react'
import { EventForm } from '../components/Forms/EventForm'

type EventData = {
  id: string
  title: string
  date: string
  createdBy: {
    name: string
  }
}

export async function eventLoader({ params }: LoaderFunctionArgs) {
  return await fetchWithErrorHandling(`/api/v1/events/${params.eventId}`)
}

export async function updateEventAction({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData()
  return await fetchWithErrorHandling(`/api/v1/events/${params.eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: formData.get('title'),
      date: formData.get('date'),
    }),
  })
}

export async function deleteEventAction({ params }: ActionFunctionArgs) {
  await fetchWithErrorHandling(`/api/v1/events/${params.eventId}`, {
    method: 'DELETE',
  })
  return redirect('/events')
}

export function Event() {
  const data = useLoaderData() as EventData
  const [isEditing, setIsEditing] = useState(false)
  return (
    <>
      {!isEditing && (
        <>
          <h1>{data.title}</h1>
          <p>{new Date(data.date).toLocaleDateString()}</p>
          <p>{data.createdBy.name}</p>
          <Form method="delete" action={`/events/${data.id}/delete`}>
            <button type="submit">Delete event</button>
          </Form>
          <button onClick={() => setIsEditing(true)}>Update event</button>
        </>
      )}
      {isEditing && (
        <Form method="put" onSubmit={() => setIsEditing(false)}>
          <EventForm title={data.title} date={data.date} />
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </Form>
      )}
    </>
  )
}

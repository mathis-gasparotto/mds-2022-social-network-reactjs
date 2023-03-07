import { ActionFunctionArgs, Form, useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'

type EventsData = {
  id: number
  title: string
  date: string
  createdBy: {
    id: number
    name: string
  }
}[]

export async function eventsLoader() {
  const response = await fetch('/api/v1/events')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as EventsData
}

export async function addEventAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const event = await fetchWithErrorHandling('/api/v1/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: formData.get('title'),
      date: formData.get('date'),
    }),
  })
  return { event }
}

export const Events = () => {
  const data = useLoaderData() as EventsData

  const [sortedBy, setSortedBy] = useState<'date' | 'name'>('date')

  const sortedByDate = data.sort((a, b) => {
    if (sortedBy === 'name') {
      return a.title.localeCompare(b.title)
    }

    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <>
      <h1>Events</h1>

      <Form method="post">
        <input type="text" name="title" placeholder="Title of the event 📆" />
        <input type="date" name="date" />
        <button type="submit">Submit</button>
      </Form>

      <p>
        <button type="button" onClick={() => setSortedBy('date')}>
          Sort by date
        </button>
        <button type="button" onClick={() => setSortedBy('name')}>
          Sort by name
        </button>
      </p>

      {sortedByDate.map(event => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>Date: {new Date(event.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            year: 'numeric',
            month: 'numeric', 
            hour: 'numeric',
            minute: 'numeric',
          })}</p>
          <p>Created by: {event.createdBy.name}</p>
        </div>
      ))}
    </>
  )
}

import React from 'react'

export function EventForm({ title, date }: { title?: string; date?: string }) {
  return (
    <>
      <input type="text" name="title" defaultValue={title} />
      <input type="date" name="date" defaultValue={date} />
      <button type="submit">Submit</button>
    </>
  )
}

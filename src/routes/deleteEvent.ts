import { Application } from 'express'
import { deleteEventById } from '../repositories/eventsRepository'

export function deleteEvent(app: Application) {
  app.delete('/api/v1/events/:eventId', async (req, res) => {
    const { eventId } = req.params
    const event = await deleteEventById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  })
}

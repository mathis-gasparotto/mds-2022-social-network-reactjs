import { Application } from 'express'
import { updateEventById } from '../repositories/eventsRepository'

export function putEvent(app: Application) {
  app.put('/api/v1/events/:eventId', async (req, res) => {
    const { eventId } = req.params
    if (!req.body.title || !req.body.date) {
      return res.status(400).json({
        message: 'Title and date are required',
      })
    }
    const event = await updateEventById(eventId, req.body.title, req.body.date)
    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      })
    }
    res.json(event)
  })
}

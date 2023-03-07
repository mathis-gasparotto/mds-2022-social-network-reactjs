import { Application } from 'express-ws'
import { findAllEvents } from '../repositories/eventsRepository'

export function getEvents(app: Application) {
  app.get('/api/v1/events', async (req, res) => {
    res.send(await findAllEvents())
  })
}

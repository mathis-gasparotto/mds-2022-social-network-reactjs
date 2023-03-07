import { Application } from 'express'
import bodyParser from 'body-parser'
import { findUserById } from '../repositories/userRepository'
import { createEvent } from '../repositories/eventsRepository'

export function postEvents(app: Application) {
  app.post('/api/v1/events', bodyParser.json(), async (req, res) => {
    if (!req.body.title || !req.body.date) {
      return res.status(400).send({
        message: 'Missing title or date',
      })
    }

    const user = await findUserById(req.signedCookies.ssid)
    if (!user) {
      return res.status(401).send({
        message: 'Unauthorized',
      })
    }

    res.send(await createEvent(req.body.title, req.body.date, user))
  })
}

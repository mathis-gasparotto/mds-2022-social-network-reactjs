import { Application } from 'express-ws'
import { logoutUser } from '../repositories/userRepository'

export function postLogout(app: Application) {
  app.post('/api/v1/logout', (req, res) => {
    logoutUser(res)
    res.status(204).send()
    return
  })
}

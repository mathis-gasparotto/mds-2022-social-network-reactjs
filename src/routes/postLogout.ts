import { Application } from 'express-ws'
import { logoutUser } from '../../repositories/userRepository'

export function postLogout(app: Application) {
  app.post('/logout', (req, res) => {
    logoutUser(res)
    return
  })
}

import { Application } from 'express-ws'
import { deleteUser, logoutUser } from '../repositories/userRepository'

export function deleteProfile(app: Application) {
  app.delete('/api/v1/profile', async (req, res) => {
    await deleteUser(req.signedCookies.ssid)
    logoutUser(res)
    return res.status(200).send({ message: 'OK' })
  })
}

import { Application } from 'express-ws'
import { deleteUser, logoutUser } from '../../repositories/userRepository'

export function postDeleteAccount(app: Application) {
  app.post('/delete-account', async (req, res) => {
    await deleteUser(req.signedCookies.ssid)
    logoutUser(res)
    return
  })
}

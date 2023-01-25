import { Application } from 'express-ws'
import path from 'path'
import { findUserById } from '../../repositories/userRepository'

export function getProfile(app: Application) {
  app.get('/profile', async (req, res) => {
    try {
      const user = await findUserById(req.signedCookies.ssid)
      if (!user) {
        return
      }
      res.render(path.join(__dirname, '../views/profile.ejs'), { user })
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  })
}

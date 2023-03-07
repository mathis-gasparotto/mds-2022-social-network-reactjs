import { Application } from 'express-ws'
import path from 'path'
import { findUserById } from '../repositories/userRepository'

export function getProfile(app: Application) {
  app.get('/api/v1/profile', async (req, res) => {
    try {
      const user = await findUserById(req.signedCookies.ssid)
      if (!user) {
        return
      }
      res.send(user)
      // res.render(path.join(__dirname, '../views/profile.ejs'), { user })
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  })
}

import { Application } from 'express-ws'
import path from 'path'

export function getRegister(app: Application) {
  app.get('/register', (req, res) => {
    res.render(path.join(__dirname, '../views/register.ejs'))
  })
}

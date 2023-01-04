import { NextFunction, Request, Response } from "express"
import { findUserById } from "../../repositories/userRepository"

export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  if (!req.signedCookies.ssid) {
    res.redirect('/login')
    return
  }
  let user = await findUserById(req.signedCookies.ssid)
  if(!user) {
    res.clearCookie('ssid')
    res.redirect('/login')
    return
  }
  next()
}
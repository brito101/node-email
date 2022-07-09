import { Request, Response } from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const contact = async (req: Request, res: Response) => {
  let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT as string),
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
  })
  let message = {
    from: process.env.EMAIL_SYSTEM as string,
    to: process.env.EMAIL_CONTACT as string,
    replyTo: req.body.from,
    subject: req.body.subject,
    html: req.body.message,
    text: req.body.message,
  }

  let info = await transport.sendMail(message)
  console.log(info)
  res.json({ success: true })
}

import { Request, Response } from "express"

import User from "../models/User"

export const home = async (req: Request, res: Response) => {
  let users = await User.find({}).sort({ "name.firstName": 1 })

  res.render("pages/home", {
    users,
  })
}

export const addUserAction = async (req: Request, res: Response) => {
  let newUser = new User()
  newUser.name = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
  }
  newUser.email = req.body.email as string
  newUser.age = parseInt(req.body.age as string)
  newUser.interests = req.body.interests.split(",")

  await newUser.save()

  let users = await User.find({}).sort({ "name.firstName": 1 })
  res.render("pages/home", {
    users,
  })
}

export const addYear = async (req: Request, res: Response) => {
  let id = req.params.id

  if (id) {
    let user = await User.findById(id)
    if (user) {
      user.age++
      await user.save()
      res.redirect("/")
    }
  }
}

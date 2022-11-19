const bcrypt = require('bcrypt')
const express = require('express')
const { User } = require('../models')

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email: email
    }
  })

  if (user) {
    const passedAuth = await bcrypt.compare(
      password,
      user.password
    )
    if (passedAuth) {
      return res.send(user)
    }
  }
  
  res.status(401).send({ message: "User cannot be authenticated" })
})

router.post('/register', async (req, res) => {
  const {
    firstName, 
    lastName, 
    email, 
    password1
  } = req.body
  
  const existingUser = await User.findOne({
    where: {
      email: email
    }
  })
  
  if (existingUser) {
    return res.send({ message: "Email address already in use" })
  }

  try {
    const hashedPassword = await bcrypt.hash(password1, 10)
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    })
    res.send(newUser)
  } catch (e) {
    res.status(400).json({ message: e.messgae })
  }
})

module.exports = router
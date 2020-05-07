const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).send('please enter an email and password')
  } else {
    try {
      const user = await User.findOne({where: {email: req.body.email}})
      if (!user) {
        res.status(401).send("Oops, we can't find that email")
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send("Oops, that's not a match")
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    } catch (err) {
      next(err)
    }
  }
})

router.post('/signup', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).send('please enter an email and password')
  } else if (
    /^\w+([.-]?\w+[\+]?)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) ===
    false
  ) {
    res.status(401).send('please enter a valid email!')
  } else {
    try {
      const user = await User.create(req.body)
      req.login(user, err => (err ? next(err) : res.json(user)))
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

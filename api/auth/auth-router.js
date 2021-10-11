const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require('./auth-middleware');

const router = express.Router();

router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
  try{
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    const user = { username, password: hash }
    const result = await Users.add(user)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/login', checkUsernameExists, async (req, res, next) => {
    try {
      const user = await Users.findBy(req.body.username).first()
      if(bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user
        res.status(200).json({
          message: `Welcome ${user.username}`
        })
      } else {
        next({
          status: 401,
          message: "Invalid credentials"
        })
      }
    } catch (err) {
      next(err)
    }
})

router.get('/logout', (req, res, next) => {
    try {
      res.status(200).json('working')
    } catch (err) {
      next(err)
    }
})

module.exports = router;

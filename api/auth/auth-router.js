const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require('./auth-middleware');

const router = express.Router();

router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
  try{
    const { user_id, username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    const user = { user_id, username, password: hash }
    const result = await Users.add(user)
    res.status(200).json(req.user)
  } catch (err) {
    next(err)
  }
})
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */
router.post('/login', checkUsernameExists, (req, res, next) => {
    try {
      res.status(200).json('working')
    } catch (err) {
      next(err)
    }
})
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
router.get('/logout', (req, res, next) => {
    try {
      res.status(200).json('working')
    } catch (err) {
      next(err)
    }
})

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

module.exports = router;

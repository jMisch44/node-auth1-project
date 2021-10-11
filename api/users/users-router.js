const express = require('express');
const restricted = require('../auth/auth-middleware.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).json('working')
  } catch (err) {
    next(err)
  }
})

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

module.exports = router;

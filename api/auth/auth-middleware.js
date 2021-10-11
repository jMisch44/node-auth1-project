const Users = require('../users/users-model');

function restricted(req, res, next) {
  if(req.session.user) {
    next()
  } else {
    next({
      status: 401,
      message: "You shall not pass!"
    })
  }
}

async function checkUsernameFree(req, res, next) {
  try {
    const users = await Users.findBy({ username: req.body.username })
    if(!users.length) {
      next()
    } else {
      next({
        status: 422,
        message: "Username taken"
      })
    }
  } catch (err) {
    next(err)
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const user = await Users.findBy(req.body.username) 
    if(!user) {
      next({
        status: 401,
        message: "Invalid credentials"
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

function checkPasswordLength(req, res, next) {
  const { password } = req.body
  if(!password || password.trim().length < 3) {
    next({
      status: 422,
      message: "Password must be longer than 3 chars"
    })
  } else {
    next()
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
}

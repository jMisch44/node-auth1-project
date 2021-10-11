const Users = require('../users/users-model');

function restricted(req, res, next) {
  // try {

  // } catch (err) {

  // }
  if(req.session.user) {
    next()
  } else {
    next({
      status: 401,
      message: "You shall not pass!"
    })
  }
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  try {
    const { username, user_id } = req.body;
    const user = await Users.findBy(username).first()
    if(user) {
      next({
        status: 422,
        message: "Username taken"
      })
    } else {
      req.user = {username, user_id}
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists(req, res, next) {
  try {

  } catch (err) {
    next(err)
  }
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  const { password } = req.body
  if(password === undefined || password.trim().length < 3) {
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

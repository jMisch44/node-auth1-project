const db = require('../../data/db-config');
/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return db('users')
    .select('username', 'user_id')
    .orderBy('user_id')
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db('users')
    .where(filter)
    .select('username', 'user_id')
    .orderBy('user_id')
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  return db('users')
    .where('user_id', user_id)
    .select('username', 'user_id')
    .first()
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  await db('users').insert(user)
  return findById(user.id)
}

module.exports = {
  find,
  findBy,
  findById,
  add
}

const db = require('../data/dbConfig')

function find() {
    return db('users')
  }
  
  async function findBy(filter) {
    const [result] = await db('users').where(filter)
    return result
  }
  
  async function insertUser(user) {
    const newUser = await db('users').insert(user)
    return newUser 
  }
  
  module.exports = {
    find,
    findBy,
    insertUser,
  }
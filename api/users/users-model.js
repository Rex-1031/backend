const db = require('../data/dbConfig');

async function findAllUsers() {
    const results = await db('users').select('user_id', 'username')
    return results
  }
  
  async function findByUserId(user_id) {
    const [result] = await db('users')
      .select('user_id', 'username', 'phone_num')
      .where('user_id', user_id)
    return result
  }
  
  async function findPlantsByUserId(user_id) {
    const results = await db('plants').where('user_id', user_id)
    return results
  }

  module.exports={
      findAllUsers,
      findByUserId,
      findPlantsByUserId
  }
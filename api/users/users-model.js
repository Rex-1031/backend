const db = require('../data/dbConfig');

function findAll(){
  return db('users')
}

function findById(user_id){
  return db('users')
      .where('user_id', user_id)
      .first()
}

function findUser(username){
  return db('users')
      .where('username', username)

}
async function addUser(user){
  const result = await db('users').insert(user)
  return findById(result)
}
  
  async function findPlantsByUserId(user_id) {
    const results = await db('plants').where('user_id', user_id)
    return results
  }

  
function pwValidation(password){
  return db('users')
      .where('password', password )
}

  async function updateUser(user_id, changes) {
    const [updated] = await db('users')
      .update(changes, ['user_id', 'username', 'phoneNumber', 'password'])
      .where('user_id', user_id)
    return updated
  }

function deleteUser(user_id) {
  return db('users').where('user_id', user_id).del()
}

  module.exports={
      findAll,
      findUser,
      findById,
      addUser,
      findPlantsByUserId,
      pwValidation,
      updateUser,
      deleteUser
  }
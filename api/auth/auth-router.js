const router = require('express').Router();
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./tokenBuilder')
const User = require('../users/users-model')
const {
  checkPayload,
  checkUsername,
  checkLogin
} = require('../middleware/authMiddleware')


router.post('/register', checkPayload, checkUsername, (req, res, next) => {
    const { username, phoneNumber, password } = req.body

    const hash = bcrypt.hashSync(password, 8)

    User.add({username, phoneNumber, password: hash})
      .then(newUser=>{
        res.status(200).json(newUser)
      })
      .catch(next)
});




router.post('/login', checkPayload, checkLogin, (req, res, next) => {
  const { username, password} = req.body

  User.getBy(username)
    .then(([user])=>{
      if(user && bcrypt.compareSync(password, user.password)){
        const token = tokenBuilder(user)
        res.status(200).json({
          message: `welcome, ${username}`,
          token
        })
      } else {
        res.status(401).json({message: 'invalid credentials'})  
      }
    })
    .catch(next)
});

module.exports = router;
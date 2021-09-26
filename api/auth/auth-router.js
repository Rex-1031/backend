const router = require('express').Router();
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./tokenBuilder')
const User = require('../users/users-model')
const {
  checkLoginPayload,
  checkSignupPayload,
  checkUsername,
  checkLogin
} = require('../middleware/authMiddleware')


router.post('/register', checkSignupPayload, checkUsername, (req, res, next) => {
    const user = req.body

    const hash = bcrypt.hashSync(password, 8)
    user.password = hash
    User.add({user})
      .then(newUser=>{
        res.status(201).json(newUser)
      })
      .catch(next)
});




router.post('/login', checkLogin, checkLoginPayload, (req, res, next) => {
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
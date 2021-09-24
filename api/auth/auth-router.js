const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Auth = require("./auth-model");
const {
    checkUsernameAvailable,
    checkUsernameExists,
    buildToken
} = require("./auth-middleware");

router.post('/register', checkUsernameAvailable, (req, res, next) => {
    const { username, password, phone_num } = req.body
    const hash = bcrypt.hashSync(password, 8)
  
    Auth.insertUser({ username, password: hash, phone_num })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(next)
  })
  
  router.post('/login', checkUsernameExists, (req, res, next) => {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
      const token = buildToken(req.user)
      res.status(200).json({
        user_id: req.user.user_id,
        message: `welcome, ${req.user.username}`,
        token,
      })
    } else {
      next({ status: 401, message: 'invalid credentials' })
    }
  })
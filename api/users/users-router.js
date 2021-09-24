const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { checkUserId } = require("./users-middleware");
const { restricted } = require('../auth/auth-middleware')

const User = require('./users-model')

router.get('/', restricted, (req, res, next)=>{
    User.findAllUsers()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(next)
})

router.get('/:user_id', (req, res, next)=>{
    User.findByUserId(req.params.user_id)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(next)
})

router.get('/:user_id/plants', (req, res, next)=>{
    User.findPlantsByUserId(req.params.user_id)
    .then(plants =>{
        res.status(200).json(plants)
    })
    .catch(next)
})

router.put('/:user_id', (req, res, next)=>{
    User.updateUser(req.params.user_id, req.body)
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
})

router.delete('/:user_id', (req, res, next)=>{
    User.deleteUser(req.params.user_id)
        .then(()=>{
            res.status(200).json({
                message: 'User Deleted'
            })
        })
        .catch(next)
})




module.exports = router;
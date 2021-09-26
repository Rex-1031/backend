const router = require("express").Router();

const { restricted } = require('../middleware/authMiddleware')

const User = require('./users-model')

router.get('/',  (req, res, next)=>{
    User.findAll()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(next)
})

router.get('/:user_id', (req, res, next)=>{
    User.findById(req.params.user_id)
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




module.exports = router;
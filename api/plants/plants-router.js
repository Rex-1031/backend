const router = require('express').Router()
const Plants = require('./plants-model')
const { restricted } = require('../auth/auth-middleware')
const { 
    checkPlantsPayload,
    checkPlantIdExists,
    checkPlantNicknameFree,
    checkPlantUserIdExists,
} = require('./plants-middleware')

router.get('/', restricted, (req, res, next) => {
    Plants.getAllPlants()
    .then(plants => {
        res.status(200).json(plants)
    })
    .catch(next)
})

router.get('/:plant_id', restricted, checkPlantIdExists, (req, res, next) => {
    Plants.getPlantById(req.params.plant_id)
    .then(plants => {
        res.status(200).json(plants).first()
    })
    .catch(next)
})

router.post('/', restricted, checkPlantsPayload, checkPlantNicknameFree, checkPlantUserIdExists, async (req, res, next) => {
    try {
        res.status(201).json(await Plants.addPlant(req.body))
    } catch (err) {
        next(err)
    }
})

router.put('/:plant_id', restricted, checkPlantsPayload, checkPlantUserIdExists, async (req, res, next) => {
    const id = parseInt(req.params.plant_id)
    const body = req.body
    try {
        const updatedPlant = await Plants.updatePlant(id, body)
        res.json(updatedPlant)
    } catch (err) {
        next(err)
    }
})

router.delete('/:plant_id', restricted, checkPlantIdExists, async (req, res, next) => {
    const id = parseInt(req.params.plant_id)
    try {
        let deletedPlant = await Plants.deletePlant(id)
        res.status(200).json(deletedPlant)
    } catch (err) {
        next(err)
    }
})

module.exports = router
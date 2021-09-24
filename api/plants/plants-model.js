const db = require('../data/dbConfig')

async function getAllPlants() {
    let results = await db('plants')
    return results
}

function getPlantById(plant_id) {
    return db('plants as p')
    .select('p.user_id', 'p.nickname', 'p.species', 'p.h2oFrequency', 'p.image')
    .where('p.plant_id', plant_id).first()
}

async function getByNickname(filter) {
    let results = await db('plants').where(filter)
    return results
}

function getBySpecies(filter) {
    return db('users').where(filter)
}

async function addPlant(plant) {
    const [newPlantObject] = await db('plants').insert(plant, ['user_id', 'nickname', 'species', 'h2oFrequency', 'image'])
    return newPlantObject
}

async function updatePlant(plant_id, info) {
    const [updatedPlant] = await db('plants')
        .where('plant_id', plant_id)
        .update(info, [
            'user_id', 'nickname', 'species', 'h2oFrequency', 'image',
        ])
        return updatedPlant
}

async function deletePlant(plant_id) {
    const deletedPlant = await db('plants').where('plant_id', plant_id)
    await db('plants').where('plant_id', plant_id).del()
    return deletedPlant
}

module.exports = {
    getAllPlants,
    getPlantById,
    getByNickname,
    getBySpecies,
    addPlant,
    updatePlant,
    deletePlant
    
};
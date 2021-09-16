const treeService = require('../tree/tree.service')
const STORAGE_KEY = 'trees'

async function getTrees(req, res) {
    try {
        const filterBy = req.query
        console.log("🚀 ~ file: tree.controller.js ~ line 8 ~ getTrees ~ filterBy", filterBy)
        // const pets = await petService.query( filterBy)
        // res.send(pets)
        res.send('trees backend')
    } catch (err) {
        res.status(500).send({ err: 'failed to add pets' })
    }
}
async function addTree(req, res) {
    try {
        console.log(req.body);
        const pets = await treeService.save(req.body)
        res.send('add tree')
    } catch (err) {
        // logger.error('failed to  add tree', err)
        res.status(500).send({ err: 'failed to add tree' })
    }
}
// async function getPetByid(req, res) {
//     try {
//         const petId = req.params.id
//         const pets = await petService.get(STORAGE_KEY, petId)
//         res.send(pets)
//     } catch (err) {
//         logger.error('Failed to get pet by id', err)
//         res.status(500).send({ err: 'Failed to get pet by id' })
//     }
// }

// async function updatePet(req, res) {
//     try {
//         const pet = req.body
//         const savedPet = await petService.save(pet)
//         res.send(savedPet)
//     } catch (err) {
//         logger.error(`Failed to update pet: ${pet._id}`, err)
//         res.status(500).send({ err: 'Failed to update pet' })
//     }
// }


module.exports = {
    getTrees, addTree
}

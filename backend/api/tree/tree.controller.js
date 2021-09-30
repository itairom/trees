const treeService = require('../tree/tree.service')
const STORAGE_KEY = 'trees'

async function getTrees(req, res) {
    try {
        const currentTableId = req.query[0]
        const trees = await treeService.query(currentTableId)
        res.send(trees)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Trees' })
    }
}

async function querySurveyIdList(req, res) {
    try {
        // const filterBy = req.query
        const trees = await treeService.querySurveyIdList()
        res.send(trees)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Trees' })
    }
}
async function getSurveyTrees(req, res) {
    try {
        console.log('call getSurveyTrees');
        const surveyId = req.query[0]
        console.log("🚀  surveyId", surveyId)
        const trees = await treeService.querySurveyTrees(surveyId)
        res.send(trees)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Trees' })
    }
}

async function addTree(req, res) {
    try {
        console.log(req.body);
        const pets = await treeService.save(req.body)
        res.send('add tree')
    } catch (err) {
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
    getTrees, addTree, querySurveyIdList, getSurveyTrees
}

const treeService = require('../tree/tree.service')
const STORAGE_KEY = 'trees'

// async function getTrees(req, res) {
//     try {
//         const currentTableId = req.query[0]
//         const username = req.query[1]
//         const trees = await treeService.query(currentTableId,username)
//         res.send(trees)
//     } catch (err) {
//         res.status(500).send({ err: 'failed to get Trees' })
//     }
// }
async function getTreeById(req, res) {
    try {
        const { treeId } = req.params
        const tree = await treeService.queryTreeById(treeId)
        res.send(tree)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Tree by ID' })
    }
}
async function removeTree(req, res) {
    try {
        const currentTreeId = req.params.treeId
        const removedTree = await treeService.removeTree(currentTreeId)
        res.send('remove tree', removedTree)
    } catch (err) {
        res.status(500).send({ err: 'failed to remove tree' })
    }
}

async function querySurveyIdList(req, res) {
    try {
        const { username } = req.query
        const trees = await treeService.querySurveyIdList(username)
        res.send(trees)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Trees' })
    }
}
async function getSurveyTrees(req, res) {
    try {
        console.log(req.query);
        const surveyId = req.query[0]
        const username = req.query[1]

        const trees = await treeService.querySurveyTrees(surveyId,username)
        res.send(trees)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Trees' })
    }
}

async function addTree(req, res) {
    try {
        console.log(req.body);
        const tree = await treeService.save(req.body)
        res.send(tree)
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


module.exports = {
     addTree, querySurveyIdList, getSurveyTrees, removeTree, getTreeById
}

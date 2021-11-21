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
        const { treeId, username } = req.params
        const tree = await treeService.queryTreeById(treeId, username)
        res.send(tree)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Tree by ID' })
    }
}
async function removeTree(req, res) {
    try {
        const { treeId, username } = req.params
        const removedTree = await treeService.removeTree(treeId, username)
        res.status(200).send('remove tree', removedTree)
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
        const surveyId = req.query[0]
        const username = req.query[1]

        const trees = await treeService.querySurveyTrees(surveyId, username)
        res.send(trees)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Trees' })
    }
}
async function querySurvey(req, res) {
    try {
        const surveyName = req.query[0]
        const username = req.query[1]
        const survey = await treeService.query(surveyName, username)
        res.send(survey)
    } catch (err) {
        res.status(500).send({ err: 'failed to get Trees' })
    }
}

// async function addTree(req, res) {
//     try {
//         const tree = await treeService.save(req.body)
//         res.send(tree)
//     } catch (err) {
//         res.status(500).send({ err: 'failed to add tree' })
//     }
// }

async function addSurvey(req, res) {
    try {
        const survey = await treeService.save(req.body)
        res.send(survey)
    } catch (err) {
        res.status(500).send({ err: 'failed to add tree' })
    }
}

async function updateSurvey(req, res) {
    try {
        const survey = await treeService.save(req.body)
        res.send(survey)
    } catch (err) {
        console.log(err)
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
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
    updateSurvey, addSurvey, querySurveyIdList, getSurveyTrees, removeTree, getTreeById,querySurvey
}

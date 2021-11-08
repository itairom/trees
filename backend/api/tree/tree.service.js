const { ObjectId } = require('bson')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

async function query(tableId, username) {

    try {
        const collection = await dbService.getCollection(username)
        const trees = await collection.find({ surveyId: tableId }).toArray()
        return trees
    } catch (err) {
        logger.error('cannot find trees', err)
        throw err
    }
}

async function removeTree(treeId, username) {
    try {
        const collection = await dbService.getCollection(username)
        const removeMsg = await collection.deleteOne({ "_id": ObjectId(treeId) })
        return removeMsg
    } catch (err) {
        logger.error('cannot remove tree', err)
        throw err
    }
}
async function queryTreeById(treeId, username) {
    try {
        const collection = await dbService.getCollection(username)
        const tree = await collection.findOne({ "_id": ObjectId(treeId) })
        return tree
    } catch (err) {
        logger.error('cannot get tree by Id', err)
        throw err
    }
}
async function querySurveyIdList(username) {
    try {
        const collection = await dbService.getCollection(username)
        // const collection = await dbService.getCollection('tree')
        const trees = await collection.find().toArray()

        let surveyIdList = []
        trees.map((tree) => {
            return surveyIdList.push(tree.surveyId)
        })
        const uniqueSurveyIdList = [...surveyIdList.reduce((map, obj) => map.set(obj.surveyTitle, obj), new Map()).values()]
        return uniqueSurveyIdList
    } catch (err) {
        logger.error('cannot  querySurveyIdList', err)
        throw err
    }
}
async function querySurveyTrees(id, username) {
    try {
        const collection = await dbService.getCollection(username)
        const trees = await collection.find({ 'surveyId.surveyTitle': id }).toArray()
        return trees
    } catch (err) {
        logger.error('cannot find trees', err)
        throw err
    }
}

async function save(info) {
    let savedTree = { ...info[0] }
    const { username } = info[1]
    const tree = info[0]
    const collection = await dbService.getCollection(username)
    try {
        if (tree._id) {
            delete savedTree['_id']
            //update
            await collection.updateOne({ "_id": ObjectId(tree._id) }, { $set: { ...savedTree } })
        } else {
            //create
            savedTree.createdAt = Date.now()
            await collection.insertOne(savedTree)
        }
    } catch (err) {
        logger.error('cannot save tree', err)
        throw err
    }
    return savedTree
}

module.exports = {
    query, queryTreeById, save, querySurveyIdList, querySurveyTrees, removeTree
}
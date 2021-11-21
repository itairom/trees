const { ObjectId } = require('bson')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

async function query(surveyName, username) {
    try {
        const collection = await dbService.getCollection(username)
        const survey = await collection.find({ 'surveyInfo.surveyTitle': surveyName  }).toArray()
        return survey[0]
    } catch (err) {
        logger.error('cannot find trees', err)
        throw err
    }
}
// async function query(tableId, username) {

//     try {
//         const collection = await dbService.getCollection(username)
//         const trees = await collection.find({ surveyId: tableId }).toArray()
//         return trees
//     } catch (err) {
//         logger.error('cannot find trees', err)
//         throw err
//     }
// }

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
        const surveys = await collection.find().toArray()


        const surveyIdList= surveys.map((survey) => {
            return survey.surveyInfo
        })
        return surveyIdList
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
    let savedSurvey = { ...info[0] }
    const { username } = info[1]
    const survey = info[0]
    const collection = await dbService.getCollection(username)
    if (survey._id) {
        try {
            delete savedSurvey['_id']
            await collection.updateOne({ "_id": ObjectId(survey._id) }, { $set: { ...savedSurvey } })
            return savedSurvey
        }
        catch {
            throw err
        }
    } else {
        try {
            savedSurvey.surveyInfo.createdAt = Date.now()
            await collection.insertOne(savedSurvey)
            return savedSurvey
        }
        catch (err) {
            throw err
        }
    }
}


module.exports = {
    query, queryTreeById, save, querySurveyIdList, querySurveyTrees, removeTree
}
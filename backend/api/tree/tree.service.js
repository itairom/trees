const { ObjectId } = require('bson')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

async function query(tableId,username) {

    try {
        // const collection = await dbService.getCollection('tree')
        console.log('id,username',tableId,username);

        const collection = await dbService.getCollection(username)
        const trees = await collection.find({ surveyId: tableId }).toArray()
        return trees
    } catch (err) {
        logger.error('cannot find trees', err)
        throw err
    }
}

async function removeTree(treeId) {
    try {
        const collection = await dbService.getCollection('tree')
        const removeMsg = await collection.deleteOne({ "_id": ObjectId(treeId) })
        return removeMsg
    } catch (err) {
        logger.error('cannot remove tree', err)
        throw err
    }
}
async function queryTreeById(treeId) {
    try {
        const collection = await dbService.getCollection('tree')
        const tree = await collection.findOne({ "_id": ObjectId(treeId) })
        return tree
    } catch (err) {
        logger.error('cannot get tree by Id', err)
        throw err
    }
}
async function querySurveyIdList(username) {
    console.log("🚀 ~ file: tree.service.js ~ line 41 ~ querySurveyIdList ~ username", username)
    try {
        const collection = await dbService.getCollection(username)
        // const collection = await dbService.getCollection('tree')
        const trees = await collection.find().toArray()

        let surveyIdList = []
        trees.map((tree) => {
            return surveyIdList.push(tree.surveyId)
        })
        console.log("🚀 ~ file: tree.service.js ~ line 48 ~ querySurveyIdList ~ surveyIdList", surveyIdList)
        const uniqueSurveyIdList = [...surveyIdList.reduce((map, obj) => map.set(obj.surveyTitle, obj), new Map()).values()]
        return uniqueSurveyIdList
    } catch (err) {
        logger.error('cannot  querySurveyIdList', err)
        throw err
    }
}
async function querySurveyTrees(id,username) {
    try {
        console.log('id,username',id,username);
        const collection = await dbService.getCollection(username)
        const trees = await collection.find({ 'surveyId.surveyTitle': id }).toArray()
        return trees
    } catch (err) {
        logger.error('cannot find trees', err)
        throw err
    }
}

async function save(info) {
    let savedTree = {...info[0]} 
    const {username} = info[1]
    const tree = info[0]
    console.log("🚀 ~ file: tree.service.js ~ line 68 ~ save ~ username" ,tree, username)
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

// function get(entityType, entityId) {
//     return query(entityType)
//         .then(entities => entities.find(entity => entity._id === entityId))
// }


// function _buildCriteria(filterBy) {

//     if (!filterBy) return {}

//     const { type, age, location, gender, size } = filterBy

//     const criteria = {}
//     // if (filterBy.type === type ) {


//     if (size) {
//         criteria.size = { $regex: new RegExp(filterBy.size, 'ig') }
//         // criteria.size.find({ $text: { $search: size } })
//     }
//     if (type) {
//         criteria.type = { $regex: new RegExp(filterBy.type, 'ig') }
//     }
//     if (age) {
//         criteria.age = { $regex: new RegExp(filterBy.age, 'ig') }
//     }
//     if (gender) {
//         criteria.gender = gender
//     }
//     if (location) {
//         criteria.location.include(location)
//     }

//     return criteria
// }

module.exports = {
    query, queryTreeById, save, querySurveyIdList, querySurveyTrees, removeTree
}
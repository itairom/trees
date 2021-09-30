const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

async function query(tableId) {
    console.log("tableID", tableId)

    try {
        const collection = await dbService.getCollection('tree')
        const trees = await collection.find({ surveyId: tableId }).toArray()
        return trees
    } catch (err) {
        logger.error('cannot find trees', err)
        throw err
    }
}
async function querySurveyIdList() {
    try {
        const collection = await dbService.getCollection('tree')
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
async function querySurveyTrees(id) {
    try {
        const collection = await dbService.getCollection('tree')
        const trees = await collection.find({ 'surveyId.surveyTitle': id }).toArray()
        // console.log("🚀 ~ file: tree.service.js ~ line 41 ~ querySurveyTrees ~ trees", trees)
        return trees
    } catch (err) {
        logger.error('cannot find trees', err)
        throw err
    }
}

async function save(tree) {
    let savedTree = { ...tree }


    const collection = await dbService.getCollection('tree')
    try {
        if (tree._id) {
            //update
            savedTree.updatedAt = Date.now()
            await collection.updateOne({ _id: tree._id }, { $set: savedTree })
        } else {
            //create
            savedTree.createdAt = Date.now()
            await collection.insertOne(savedTree)
        }
    } catch (err) {
        logger.error('cannot save pet', err)
        throw err
    }
    return savedTree
}

// function get(entityType, entityId) {
//     return query(entityType)
//         .then(entities => entities.find(entity => entity._id === entityId))
// }


// function _buildCriteria(filterBy) {
//     // console.log("🚀 ~ file: pet.service.js ~ line 79 ~ _buildCriteria ~ filterBy", filterBy)

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
    query, save, querySurveyIdList, querySurveyTrees
}
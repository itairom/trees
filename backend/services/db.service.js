const MongoClient = require('mongodb').MongoClient

const config = require('../config')

module.exports = {
    getCollection, createCollection
}

const dbName = 'tree_db'


var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)

        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}
async function createCollection(collectionName) {
    try {
        const db = await connect()
        // const collection = await db.collection(collectionName).find({})
        const collectionArray = await db.listCollections().toArray()
        const isCollectionExist = collectionArray.find(collection => {
            return (collection.name === collectionName)
        })
        console.log("🚀 ~ file: db.service.js ~ line 34 ~ createCollection ~ isCollectionExist", collectionName, isCollectionExist)
        if (isCollectionExist === undefined) {
            console.log('in');
            await db.createCollection(`${collectionName}`)
        }
        return 'collection'
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}

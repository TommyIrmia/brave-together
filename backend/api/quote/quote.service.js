const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('quote')
        const quotes = await collection.find(criteria).toArray()

        return quotes
    } catch (err) {
        logger.error('cannot find quotes', err)
        throw err
    }

}

async function getById(quoteId) {
    try {
        const collection = await dbService.getCollection('quote')
        const quote = await collection.findOne({ _id: ObjectId(quoteId) })
        return quote
    } catch (err) {
        logger.error(`cannot find quote with id: ${quoteId}`, err)
        throw err
    }

}

async function remove(quoteId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { loggedinUser } = store
        const collection = await dbService.getCollection('quote')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(quoteId) }
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove quote ${quoteId}`, err)
        throw err
    }
}


async function add(quote) {
    try {
        const collection = await dbService.getCollection('quote')
        await collection.insertOne(quote)
        return quote
    } catch (err) {
        logger.error('cannot insert quote', err)
        throw err
    }
}

async function update(quote) {
    try {
        const quoteCopy = { ...quote }
        delete quoteCopy._id

        const collection = await dbService.getCollection('quote')
        await collection.updateOne({ _id: ObjectId(quote._id) }, { $set: quoteCopy })
    } catch (err) {
        logger.error('cannot update quote', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}



const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('quote')
        const quotes = await collection.find(criteria).toArray()
        const totalQuotesCount = quotes.length

        //PAGING
        const { page, quotesPerPage } = filterBy
        const firstQuoteIdx = quotesPerPage * (page - 1)
        const quotesToDisplay = quotes.splice(firstQuoteIdx, quotesPerPage)
        console.log('page', page);
        console.log('itemsPerPage', quotesPerPage);
        console.log('firstQuoteIdx', firstQuoteIdx);
        return { quotesToDisplay, totalQuotesCount }
    } catch (err) {
        logger.error('cannot find quotes', err)
        throw new Error('quotesNotFound')
    }

}

async function getById(quoteId) {
    try {
        const collection = await dbService.getCollection('quote')
        const quote = await collection.findOne({ _id: ObjectId(quoteId) })
        return quote
    } catch (err) {
        logger.error(`cannot find quote with id: ${quoteId}`, err)
        throw new Error('quoteNotFound')
    }

}

async function remove(quoteId) {
    try {
        const collection = await dbService.getCollection('quote')
        const criteria = { _id: ObjectId(quoteId) }
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove quote ${quoteId}`, err)
        throw new Error('cantRemoveFromDb')
    }
}


async function add(quote) {
    try {
        const collection = await dbService.getCollection('quote')
        await collection.insertOne(quote)
        return quote
    } catch (err) {
        logger.error('cannot insert quote', err)
        throw new Error('cantAddQuote')
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
        throw new Error('cantUpdateQuote')
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



const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('story')
        const storys = await collection.find(criteria).toArray()

        return storys
    } catch (err) {
        logger.error('cannot find storys', err)
        throw err
    }

}

async function getById(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        const story = await collection.findOne({ _id: ObjectId(storyId) })
        return story
    } catch (err) {
        logger.error(`cannot find story with id: ${storyId}`, err)
        throw err
    }

}

async function remove(storyId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('story')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(storyId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove story ${storyId}`, err)
        throw err
    }
}


async function add(story) {
    try {
        const storyToAdd = {
            byUserId: ObjectId(story.byUserId),
            aboutUserId: ObjectId(story.aboutUserId),
            txt: story.txt
        }
        const collection = await dbService.getCollection('story')
        await collection.insertOne(storyToAdd)
        return storyToAdd
    } catch (err) {
        logger.error('cannot insert story', err)
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
    add
}



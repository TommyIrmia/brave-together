const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('story')
        const stories = await collection.find(criteria).toArray()
        return stories
    } catch (err) {
        logger.error('cannot find stories', err)
        throw new Error('storiesNotFound')
    }

}

async function getById(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        const story = await collection.findOne({ _id: ObjectId(storyId) })
        return story
    } catch (err) {
        logger.error(`cannot find story with id: ${storyId}`, err)
        throw new Error('storyNotFound')
    }

}

async function remove(storyId) {
    try {
        const collection = await dbService.getCollection('story')
        const criteria = { _id: ObjectId(storyId) }
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove story ${storyId}`, err)
        throw new Error('cantRemoveFromDb')
    }
}


async function add(story) {
    try {
        const collection = await dbService.getCollection('story')
        await collection.insertOne(story)
        return story
    } catch (err) {
        logger.error('cannot insert story', err)
        throw new Error('cantAddStory')
    }
}

async function update(story) {
    try {
        const storyCopy = { ...story }
        delete storyCopy._id

        const collection = await dbService.getCollection('story')
        await collection.updateOne({ _id: ObjectId(story._id) }, { $set: storyCopy })
    } catch (err) {
        logger.error('cannot update story', err)
        throw new Error('cantUpdateStory')
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.txt) {
        var criteriaTxt = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                heroName: criteriaTxt
            },
            {
                country: criteriaTxt
            },
            {
                title: criteriaTxt
            }
        ]


    }

    if (filterBy.tags?.length) {
        criteria.tags = { $all: filterBy.tags }
    }

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



const logger = require('../../services/logger.service')
const storyService = require('./story.service')
const errors = require('../../errorMessages/storyError')

async function getStories(req, res) {
    try {
        const stories = await storyService.query(req.query)
        res.send(stories)
    } catch (err) {
        logger.error('Cannot get storys', err)
        res.status(500).send({ err: 'Failed to get storys' })
    }
}

async function getStory(req, res, next) {
    const storyId = req.params.id
    try {
        const story = await storyService.getById(storyId)
        res.send(story)
    } catch (err) {
        logger.error(`Cannot get story with id: ${storyId}`, err)
        next(errors[err.message])
    }
}

async function deleteStory(req, res) {
    try {
        const deletedCount = await storyService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove story' })
        }
    } catch (err) {
        logger.error('Failed to delete story', err)
        res.status(500).send({ err: 'Failed to delete story' })
    }
}


async function addStory(req, res) {
    try {
        var story = req.body
        story = await storyService.add(story)
        res.send(story)
    } catch (err) {
        console.log(err)
        logger.error('Failed to add story', err)
        res.status(500).send({ err: 'Failed to add story' })
    }
}

async function updateStory(req, res) {
    try {
        const story = req.body
        const updatedStory = await storyService.update(story)
        res.send(updatedStory)
    } catch (err) {
        console.log(err)
        logger.error(`Failed to update story with id:${story._id}`, err)
        res.status(500).send({ err: 'Failed to update story' })
    }
}

module.exports = {
    getStories,
    getStory,
    deleteStory,
    addStory,
    updateStory
}
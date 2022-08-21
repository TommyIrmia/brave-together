const logger = require('../../services/logger.service')
const storyService = require('./story.service')
const errors = require('../../errorMessages/storyError')

async function getStories(req, res, next) {
    try {
        const stories = await storyService.query(req.query)
        res.send(stories)
    } catch (err) {
        logger.error('Cannot get stories', err)
        next(errors[err.message])
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

async function deleteStory(req, res, next) {
    try {
        const deletedCount = await storyService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            next(errors['noStoryWasDeleted'])
        }
    } catch (err) {
        logger.error('Failed to delete story', err)
        next(errors[err.message])
    }
}


async function addStory(req, res, next) {
    try {
        var story = req.body
        story = await storyService.add(story)
        res.send(story)
    } catch (err) {
        logger.error('Failed to add story', err)
        next(errors[err.message])
    }
}

async function updateStory(req, res, next) {
    try {
        const story = req.body

        await storyService.update(story)

        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        res.send({ msg: 'Updated successfully' })

    } catch (err) {
        logger.error(`Failed to update story with id:${story._id}`, err)
        next(errors[err.message])
    }
}

module.exports = {
    getStories,
    getStory,
    deleteStory,
    addStory,
    updateStory
}
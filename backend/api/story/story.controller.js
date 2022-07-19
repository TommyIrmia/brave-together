const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const storyService = require('./story.service')

async function getStories(req, res) {
    try {
        const storys = await storyService.query(req.query)
        res.send(storys)
    } catch (err) {
        logger.error('Cannot get storys', err)
        res.status(500).send({ err: 'Failed to get storys' })
    }
}

async function getStory(req, res) {
    try {
        const storyId = req.params.id
        const story = await storyService.getById(storyId)
        res.send(story)
    } catch (err) {
        logger.error(`Cannot get story with id: ${storyId}`, err)
        res.status(500).send({ err: `Failed to get story. storyId: ${storyId}` })
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

    // Uncomment when users are implemented
    // var loggedinUser = authService.validateToken(req.cookies.loginToken)

    try {
        var story = req.body
        story = await storyService.add(story)

        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        res.send(story)

    } catch (err) {
        logger.error('Failed to add story', err)
        res.status(500).send({ err: 'Failed to add story' })
    }
}

async function updateStory(req, res) {

    // Uncomment when users are implemented
    // var loggedinUser = authService.validateToken(req.cookies.loginToken)
    try {
        const story = req.body
        await storyService.update(story)

        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        res.send({ msg: 'Updated successfully' })

    } catch (err) {
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
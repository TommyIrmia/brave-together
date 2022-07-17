const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware') Will be neede later
const { log } = require('../../middlewares/logger.middleware')
const { addStory, getStories, deleteStory, getStory } = require('./story.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStories)
router.get('/:id', log, getStory)
router.post('/', log, addStory)
router.delete('/:id', deleteStory)

module.exports = router
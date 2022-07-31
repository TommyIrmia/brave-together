const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { errorHandler } = require('../../middlewares/errorHandler.middleware')
const { addStory, getStories, deleteStory, getStory, updateStory } = require('./story.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStories)
router.get('/:id', log, getStory)
router.post('/', log, addStory)
router.put('/:id', log, updateStory)
router.delete('/:id', deleteStory)

module.exports = router
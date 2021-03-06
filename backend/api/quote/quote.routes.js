const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware') // Will be neede later
const { log } = require('../../middlewares/logger.middleware')
const { addQuote, getQuotes, deleteQuote, getQuote, updateQuote } = require('./quote.controller')
const router = express.Router()

router.get('/', log, getQuotes)
router.get('/:id', log, getQuote)
router.post('/', log, requireAuth, addQuote)
router.put('/:id', log, updateQuote)
router.delete('/:id', deleteQuote)

module.exports = router
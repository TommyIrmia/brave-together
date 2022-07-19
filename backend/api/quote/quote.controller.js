const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const quoteService = require('./quote.service')

async function getQuotes(req, res) {
    try {
        const quotes = await quoteService.query(req.query)
        res.send(quotes)
    } catch (err) {
        logger.error('Cannot get quotes', err)
        res.status(500).send({ err: 'Failed to get quotes' })
    }
}

async function getQuote(req, res) {
    try {
        const quoteId = req.params.id
        const quote = await quoteService.getById(quoteId)
        res.send(quote)
    } catch (err) {
        logger.error(`Cannot get quote with id: ${quoteId}`, err)
        res.status(500).send({ err: `Failed to get quote. quoteId: ${quoteId}` })
    }
}

async function deleteQuote(req, res) {
    try {
        const deletedCount = await quoteService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove quote' })
        }
    } catch (err) {
        logger.error('Failed to delete quote', err)
        res.status(500).send({ err: 'Failed to delete quote' })
    }
}


async function addQuote(req, res) {

    // Uncomment when users are implemented
    // var loggedinUser = authService.validateToken(req.cookies.loginToken)

    try {
        var quote = req.body
        quote.owner = req.user
        quote = await quoteService.add(quote)

        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        res.send(quote)

    } catch (err) {
        logger.error('Failed to add quote', err)
        res.status(500).send({ err: 'Failed to add quote' })
    }
}

async function updateQuote(req, res) {

    // Uncomment when users are implemented
    // var loggedinUser = authService.validateToken(req.cookies.loginToken)
    try {
        const quote = req.body
        const updatedQuote = await quoteService.update(quote)

        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        res.send({ msg: 'Updated successfully' })

    } catch (err) {
        logger.error(`Failed to update quote with id:${quote._id}`, err)
        res.status(500).send({ err: 'Failed to update quote' })
    }
}

module.exports = {
    getQuotes,
    getQuote,
    deleteQuote,
    addQuote,
    updateQuote
}
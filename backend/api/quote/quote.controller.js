const logger = require('../../services/logger.service')
const quoteService = require('./quote.service')
const errors = require('../../errorMessages/quoteError')

async function getQuotes(req, res, next) {
    try {
        const quotes = await quoteService.query(req.query)
        res.send(quotes)
    } catch (err) {
        logger.error('Cannot get quotes', err)
        next(errors[err.message])
    }
}

async function getQuote(req, res, next) {
    const quoteId = req.params.id
    try {
        const quote = await quoteService.getById(quoteId)
        res.send(quote)
    } catch (err) {
        logger.error(`Cannot get quote with id: ${quoteId}`, err)
        next(errors[err.message])
    }
}

async function deleteQuote(req, res, next) {
    try {
        const deletedCount = await quoteService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            next(errors['noQuoteWasDeleted'])
        }
    } catch (err) {
        logger.error('Failed to delete quote', err)
        next(errors[err.message])
    }
}


async function addQuote(req, res, next) {
    try {
        var quote = req.body
        quote.owner = req.user
        quote = await quoteService.add(quote)
        res.send(quote)
    } catch (err) {
        logger.error('Failed to add quote', err)
        next(errors[err.message])
    }
}

async function updateQuote(req, res, next) {
    const quote = req.body
    try {
        const updatedQuote = await quoteService.update(quote)


        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        res.send({ msg: 'Updated successfully' })


    } catch (err) {
        logger.error(`Failed to update quote with id:${quote._id}`, err)
        next(errors[err.message])
    }
}

module.exports = {
    getQuotes,
    getQuote,
    deleteQuote,
    addQuote,
    updateQuote
}
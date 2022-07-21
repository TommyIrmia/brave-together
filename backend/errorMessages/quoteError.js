module.exports = {
    quotesNotFound: { status: 404, message: `quotes were not found` },
    quoteNotFound: { status: 404, message: `quote was not found` },
    cantRemoveFromDb: { status: 500, message: `quotes cant be deleted from db` },
    noQuoteWasDeleted: { status: 400, message: `No quote with this id was found to delete` },
    cantAddQuote: { status: 500, message: `No quote was added` },
    cantUpdateQuote: { status: 500, message: `No quote was updated` },
}
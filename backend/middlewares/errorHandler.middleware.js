function errorHandler(req, res, next) {
    console.log('in error handler');
    res.send('from error handler')
    // res.send('in error handler')
    // res.status(error?.status || 500)
    // res.send({ "error": true, message: error?.message || 'Internal Server Error' })
}

module.exports = {
    errorHandler
}
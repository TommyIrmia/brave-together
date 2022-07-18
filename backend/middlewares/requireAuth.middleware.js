const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')

function requireAuth(req, res, next) {
  const loginToken = req.header('auth-token')
  if (!loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(loginToken)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  req.user = loggedinUser
  next()
}

function requireAdmin(req, res, next) {
  const loginToken = req.header('auth-token')
  if (!loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(loginToken)
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}

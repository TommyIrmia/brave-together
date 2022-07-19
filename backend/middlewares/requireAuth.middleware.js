const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  const { accessToken, refreshToken } = req.cookies
  if (!accessToken) return res.status(401).send('Not Authenticated')

  const { user, expired } = authService.validateToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
  if (user) {
    console.log('here1', user);
    req.user = { _id: user._id }
    return next()
  }

  const { user: refreshUser } = expired && refreshToken ? authService.validateToken(refreshToken, process.env.REFRESH_TOKEN_SECRET) : { user: null }
  if (!refreshUser) return res.status(401).send('Not Authenticated')

  const isValidRefreshToken = await authService.isValidRefreshToken(refreshToken)
  if (!isValidRefreshToken) return res.status(401).send('Not Authenticated')

  const newAccessToken = authService.getJWT({ _id: refreshUser.userId }, process.env.ACCESS_TOKEN_SECRET, '30s')

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true
  })

  console.log('here2', refreshUser);
  req.user = { _id: refreshUser.userId }
  next()
}

function requireAdmin(req, res, next) {
  if (!accessToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(accessToken)
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

const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)

        // creating tokens
        const accessToken = authService.getJWT({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, "5s")
        const refreshToken = authService.getJWT({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, "1y")
        await authService.addRefreshToken(refreshToken)

        res.cookie('accessToken', accessToken, {
            httpOnly: true
        })

        res.cookie('refreshToken', refreshToken, {
            maxAge: 3.154e10,
            httpOnly: true
        })


        logger.info('User login: ', user)
        res.json({ user, accessToken, refreshToken })
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const credentials = req.body
        const account = await authService.signup(credentials)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(credentials.email, credentials.password)
        logger.info('User signup:', user)

        const accessToken = authService.getJWT({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, "5s")
        const refreshToken = authService.getJWT({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, "1y")
        await authService.addRefreshToken(refreshToken)

        res.cookie('accessToken', accessToken, {
            httpOnly: true
        })

        res.cookie('refreshToken', refreshToken, {
            maxAge: 3.154e10,
            httpOnly: true
        })

        res.json(`logged in with: ${user}`)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        const { refreshToken } = req.cookies
        await authService.removeRefreshToken(refreshToken)
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}
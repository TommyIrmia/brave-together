const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)

    const user = await userService.getByEmail(email)
    if (!user) throw new Error('emailDosntExist')
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('wrongCreds')


    delete user.password
    user._id = user._id.toString()
    return user
}


async function signup({ email, password, firstName, lastName, cellphone }) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with email: ${email}, fullname: ${firstName}  ${lastName}`)
    if (!email || !password) throw new Error('missingCreds')

    const userExist = await userService.getByEmail(email)

    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, firstName, lastName, cellphone })
}


function getJWT(payload, secret, expiresIn = '1y') {
    return jwt.sign(payload, secret, { expiresIn })
}

function validateToken(token, secret) {
    try {
        const decodec = jwt.verify(token, secret)
        return { user: decodec, expired: false }

    } catch (err) {
        return { user: null, expired: err.message.includes('jwt expired') }
    }
}

async function addRefreshToken(token) {
    try {
        const collection = await dbService.getCollection('refresh-token')
        await collection.insertOne({ token })
    } catch (err) {
        logger.error('Failed to add refresh token ' + err)
        throw new Error('cantAddToken')
    }
}

async function removeRefreshToken(token) {
    try {
        const collection = await dbService.getCollection('refresh-token')
        const { deletedCount } = await collection.deleteOne({ token })
        return deletedCount
    } catch (err) {
        logger.error('Failed to remove refresh token ' + err)
        throw new Error('cantRemoveToken')
    }
}

async function isValidRefreshToken(token) {
    try {
        const collection = await dbService.getCollection('refresh-token')
        const tokenInDb = await collection.findOne({ token })
        return tokenInDb
    } catch (err) {
        logger.error('Token is not valid ' + err)
        throw new Error('invalidToken')
    }
}


module.exports = {
    signup,
    login,
    getJWT,
    validateToken,
    addRefreshToken,
    isValidRefreshToken,
    removeRefreshToken
}
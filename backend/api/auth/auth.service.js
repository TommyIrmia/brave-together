const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)

    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')


    delete user.password
    user._id = user._id.toString()
    return user
}

// (async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()


async function signup({ email, password, firstName, lastName, cellphone }) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with email: ${email}, fullname: ${firstName}  ${lastName}`)
    if (!email || !password) return Promise.reject('Missing required signup information')

    // const userExist = await userService.getByUsername(username)
    // if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, firstName, lastName, cellphone })
}


function getLoginToken(userId) {
    // TODO: tranfer secret to .env
    return jwt.sign({ _id: userId }, 'somesecret')
}

function validateToken(loginToken) {
    try {
        const verifiedUser = jwt.verify(loginToken, 'somesecret')
        return verifiedUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}


module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}
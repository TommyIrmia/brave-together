module.exports = {
    emailDosntExist: { status: 401, message: `Email dose not exist` },
    wrongCreds: { status: 401, message: `Email and password dont match` },
    missingCreds: { status: 500, message: `Missing required credentials` },
    userExist: { status: 500, message: `Email is allready taken` },
    cantAddUser: { status: 500, message: `Cant register user to db` },
    cantAddToken: { status: 500, message: `Cant add token to db` },
    cantRemoveToken: { status: 500, message: `Cant remove token from db` },
    invalidToken: { status: 403, message: `Invalid login token!` },
}
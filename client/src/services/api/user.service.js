// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { httpService } from '../http.service'


export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
}

function getUsers() {
  return httpService.get(`user`)
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  // NOT TESTED
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // NOT TESTED
  user = await httpService.put(`user/${user._id}`, user)
  return user
}

async function login(userCred) {
  try {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
      return user
    }
  } catch (err) {
    throw err
  }
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  return user
}
async function logout() {
  return await httpService.post('auth/logout')
}


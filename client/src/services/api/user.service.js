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

async function getUsers() {
  return await httpService.get(`user`)
}

async function getById(userId) {
  return await httpService.get(`user/${userId}`)

}

async function remove(userId) {
  // NOT TESTED
  return await httpService.delete(`user/${userId}`)
}

async function update(user) {
  // NOT TESTED
  return await httpService.put(`user/${user._id}`, user)
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
  return await httpService.post('auth/signup', userCred)
}
async function logout() {
  return await httpService.post('auth/logout')
}


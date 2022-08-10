// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { httpService } from '../http.service'


export const quoteService = {
  getQuotes,
  getById,
  add,
  update,
  remove,
}

async function getQuotes() {
  return await httpService.get(`quote`)
}

async function getById(quoteId) {
  return await httpService.get(`quote/${quoteId}`)
}

async function add(quote) {
  return await httpService.post(`quote`, quote)

}

async function update(quote) {
  return await httpService.put(`quote/${quote._id}`, quote)

}

async function remove(quoteId) {
  return await httpService.delete(`quote/${quoteId}`)
}



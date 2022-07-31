// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { httpService } from '../http.service'


export const quoteService = {
  getQuotes,
  getById,
  add,
  update,
  remove,
}

function getQuotes() {
  return httpService.get(`quote`)
}

async function getById(quoteId) {
  const quote = await httpService.get(`quote/${quoteId}`)
  return quote
}

async function add(quote) {
  quote = await httpService.post(`quote`, quote)
  return quote
}

async function update(quote) {
  quote = await httpService.put(`quote/${quote._id}`, quote)
  return quote
}

function remove(quoteId) {
  return httpService.delete(`quote/${quoteId}`)
}



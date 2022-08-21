// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { httpService } from '../http.service'
import { storageService } from '../storage.service'


export const quoteService = {
  getQuotes,
  getById,
  add,
  update,
  remove,
  getEmptyQuote
}

async function getQuotes(filter) {
  return await httpService.get(`quote`, filter)
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

function getEmptyQuote(txt) {
  let quote = storageService.getQuoteFromStorage();
  if (!quote || quote.txt?.content !== txt) quote = _getEmptyTemplate(txt)
  storageService.saveQuoteToStorage(quote)
  return quote
}


function _getEmptyTemplate(content) {
  return {
    background: { type: 'color', attr: '#ffffff' },//'images/111-02.svg',
    imgs: [],
    frame: '',
    txt: {
      content,
      fontSize: 16,
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontColor: '#000000',
      pos: { x: 50, y: 150 }
    }
  }
}

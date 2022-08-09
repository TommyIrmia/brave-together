// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { httpService } from '../http.service'


export const storyService = {
  getStories,
  getById,
  add,
  update,
  remove,
}

async function getStories(filterBy) {
  return await httpService.get(`story`, filterBy)
}

async function getById(storyId) {
  return await httpService.get(`story/${storyId}`)
}

async function add(story) {
  return await httpService.post(`story`, story)
}

async function update(story) {
  return await httpService.put(`story/${story._id}`, story)
}

async function remove(storyId) {
  return await httpService.delete(`story/${storyId}`)
}



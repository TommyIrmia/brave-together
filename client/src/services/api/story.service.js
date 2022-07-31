// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { httpService } from '../http.service'


export const storyService = {
  getStories,
  getById,
  add,
  update,
  remove,
}

function getStories() {
  return httpService.get(`story`)
}

async function getById(storyId) {
  const story = await httpService.get(`story/${storyId}`)
  return story
}

async function add(story) {
  story = await httpService.post(`story`, story)
  return story
}

async function update(story) {
  story = await httpService.put(`story/${story._id}`, story)
  return story
}

function remove(storyId) {
  return httpService.delete(`story/${storyId}`)
}



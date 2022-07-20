module.exports = {
    storyNotFound: { status: 404, message: `Story was not found` },
    storiesNotFound: { status: 404, message: `Stories were not found` },
    cantRemoveFromDb: { status: 500, message: `Stories cant be deleted from db` },
    noStoryWasDeleted: { status: 400, message: `No story with this id was found to delete` },
    cantAddStory: { status: 500, message: `No story was added` },
    cantUpdateStory: { status: 500, message: `No story was updated` },
}
import React from 'react'
import { StoryPreview } from './story-preview'


export const StoryList = ({ stories }) => {
    if (!stories) return 'loading'
    if (!stories.length) return 'no stories'
    return <div className="story-list"> {stories.map(story => {
        return <StoryPreview key={story._id} story={story} />
    })}</div>
}
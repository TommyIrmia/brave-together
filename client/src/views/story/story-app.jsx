import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StoryList } from '../../cmps/story/story-list'
import { StoryFilter } from '../../cmps/story/story-filter'
import { query } from '../../store/story/story.action'

export const StoryApp = () => {
    const dispatch = useDispatch()
    const { stories } = useSelector(state => state.storyModule)
    const { filterBy } = useSelector(state => state.storyModule)
    useEffect(() => {
        dispatch(query(filterBy))
    }, [filterBy])



    console.log(stories);
    return <div className="story-app main-layout">
        <StoryFilter />
        <StoryList stories={stories} />
    </div>
}
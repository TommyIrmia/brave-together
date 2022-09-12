import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { StoryList } from '../../cmps/story/story-list'
import { StoryFilter } from '../../cmps/story/story-filter'
import { query } from '../../store/story/story.action'
import { queryParamsService } from '../../services/query-params.service'

export const StoryApp = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const { stories } = useSelector(state => state.storyModule)

    useEffect(() => {
        //TODO: transfer to service

        const filterBy = queryParamsService.getFilterFromQueryParams(searchParams)
        //
        dispatch(query(filterBy))
    }, [searchParams])

    return <div className="story-app main-layout">
        <StoryFilter setSearchParams={setSearchParams} />
        <StoryList stories={stories} />
    </div>
}
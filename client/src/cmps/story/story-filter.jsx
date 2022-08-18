import { useParams, useSearchParams } from 'react-router-dom';
import { useEffectUpdate } from '../../hooks/useEffectUpdate'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from "react-icons/bs";
import { storyConsts } from '../../consts/story-consts';
import { setFilterBy } from '../../store/story/story.action';
import { queryParamsService } from '../../services/query-params.service';


export const StoryFilter = ({ setSearchParams }) => {
    const dispatch = useDispatch()
    const { tags } = useSelector(state => state.storyModule.filterBy)
    const { filterBy } = useSelector(state => state.storyModule)


    useEffect(() => {
        //TODO: transfer to service
        let filterToQuery = { ...filterBy }
        filterToQuery.tags = filterToQuery.tags.join(',')
        const queryParams = queryParamsService.getQueryParamsToFilter(filterToQuery)
        setSearchParams(queryParams)
    }, [filterBy])

    const handleChange = ({ target: { value } }) => {
        // dispatch(setFilterByTxt(event.target.value))
        dispatch(setFilterBy('txt', value))
    }
    const isTagSelected = (tag) => {
        return tags.includes(tag)
    }
    const onToggleSelectTag = (tag) => {

        let selectedTags
        if (isTagSelected(tag)) {
            selectedTags = tags.filter(currTag => currTag !== tag)
        } else {
            selectedTags = [...tags, tag]
        }

        dispatch(setFilterBy('tags', selectedTags))




    }
    return <div className="story-filter main-layout">

        <div className="input-container">
            <input onChange={handleChange} type="text" placeholder="חיפוש לפי שם סיפור, גיבור/ה, מדינה" />
            <BsSearch className="icon" />
        </div>
        <div className="tag-filter">
            <p>סנן לפי קטגוריה:</p>
            <div className="tag-list">

                {storyConsts.tags.map(tag => {
                    return <div className={'tag' + (isTagSelected(tag) ? ' selected' : '')} key={tag} >
                        <p onClick={() => onToggleSelectTag(tag)}>
                            {tag}
                        </p>
                    </div>
                })}
            </div>
        </div>
    </div>
}
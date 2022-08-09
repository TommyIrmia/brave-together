import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from "react-icons/bs";
import { storyConsts } from '../../consts/story-consts';
import { setFilterByTxt } from '../../store/story/story.action';
import { setFilterByTags } from '../../store/story/story.action';


export const StoryFilter = () => {
    const dispatch = useDispatch()
    const { tags } = useSelector(state => state.storyModule.filterBy)
    const handleChange = (event) => {
        dispatch(setFilterByTxt(event.target.value))
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

        dispatch(setFilterByTags(selectedTags))
    }
    console.log(tags);
    return <div className="story-filter main-layout">

        <div className="input-container">
            <input onChange={handleChange} type="text" placeholder="חיפוש לפי שם סיפור, גיבור/ה, מדינה" />
            <BsSearch className="icon" />
        </div>
        <div className="tag-filter">
            <p>סנן לפי קטגוריה:</p>
            <div className="tag-list">

                {storyConsts.tags.map(tag => {
                    return <div className={'tag ' + (isTagSelected(tag) ? 'selected' : '')} key={tag} >
                        <p onClick={() => onToggleSelectTag(tag)}>
                            {tag}
                        </p>
                    </div>
                })}
            </div>
        </div>
    </div>
}
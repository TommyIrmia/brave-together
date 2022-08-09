import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";

export const StoryPreview = ({ story }) => {
    const [isFav, setIsFav] = useState(false) ///temporary
    const onSetFav = (ev) => {
        ev.stopPropagation();
        setIsFav(!isFav);
    }
    return <div className="story-preview">
        <img src="https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg" alt="" />
        {isFav ? <BsFillBookmarkFill className="fav-icon" onClick={(event) => onSetFav(event)} /> : <BsBookmark className="fav-icon" onClick={(event) => onSetFav(event)} />}
        <div className="hero-name">{story.heroName}</div>
    </div>
}
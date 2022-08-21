import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

import { loadStoryById } from '../../store/story/story.action'
import { selectQuoteToEdit } from '../../store/quote/quote.action';

import { SelectedQuotes } from '../../cmps/quote/selected-quotes';

import { storyDetailsImgs } from '../../consts/imgs.consts'
const { defaultImg, vectorTop1, vectorTop2, vectorBottom, pen, calendar } = storyDetailsImgs


export const StoryDetails = () => {
    const { story, isLoading } = useSelector((globalState) => globalState.storyModule)

    const [selectedTxt, setSelectedTxt] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isErr, setIsErr] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { storyId } = useParams()

    useEffect(() => {
        if (!storyId) setIsErr(true)
        else dispatch(loadStoryById(storyId))
    }, [storyId])

    const onQuoteTxt = () => {
        if (!selectedTxt) return
        dispatch(selectQuoteToEdit({ txt: selectedTxt }))
        navigate('/quote/edit')
    }

    const chooseText = (ev) => {
        ev.stopPropagation()
        const txt = window.getSelection().toString()
        setSelectedTxt(txt)
    }

    const onToggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    if (isErr) return <div className="testimony-container">לא נמצא סיפור מתאים</div>
    if (isLoading || !story) return <div>Loading..</div>
    return (
        <section className="story-details-container" onClick={chooseText}>
            {/* Turn into subheader - cmp! */}
            <div className="btns-container">
                <button className="prev-quotes-btn chosen">קריאת סיפור</button>
                <button className="prev-quotes-btn">ציטוטים</button>
                <button className="prev-quotes-btn ">מאגר סיפורים</button>
            </div>

            {/* Turn into a cmp that dynamiclly creates the route */}
            <div className="story-content">
                <div className="desktop-only">
                    <div className="storyline">
                        <a>ראשי</a><span>{'>>'}</span>
                        <a>קריאת סיפור</a><span>{'>>'}</span>
                        <a>{story.heroName}</a>
                    </div>
                    <div className="choose-text">בחר טקסט מעצים על מנת לשתף ציטוט </div>
                </div>


                <div className="hero-details-container">
                    <div className="hero-details">
                        <h2 className="hero-name">{story.heroName}</h2>
                        <div className="sub-details">
                            <p className="hero-author"> <img className="sm-img" src={pen} /> מחבר.ת הסיפור </p>
                            <p className="date"><img className="sm-img" src={calendar} /> {story.date} </p>
                        </div>
                    </div>

                    <div className="hero-img">
                        <img src={story.imgUrl ? story.imgUrl : defaultImg} alt="Hero Image"
                            className={'avatar' + story.imgUrl ? '' : ' default'} />

                        <div className="vector top1-vector"><img src={vectorTop1} /></div>
                        <div className="vector top2-vector"><img src={vectorTop2} /></div>
                        <div className="vector bottom-vector"><img src={vectorBottom} /></div>
                    </div>
                </div>

                <div className="story-details" onClick={chooseText} onTouchEnd={chooseText}>
                    {story.description}
                </div>
            </div>

            <div className="story-actions" >
                <div className="chosen-quotes" onClick={onToggleModal}>ציטוטים נבחרים</div>
                <div className={'choose-text' + (selectedTxt ? ' chosen' : '')}
                    onClick={onQuoteTxt}>
                    {!selectedTxt && <p>בחר טקסט מעצים על מנת לשתף ציטוט</p>}
                    {selectedTxt && <p>צטט</p>}
                </div>
            </div>

            {isModalOpen && <SelectedQuotes quotes={story.quotes} storyId={storyId} navigate={navigate}
                onToggleModal={onToggleModal} onChooseText={onQuoteTxt} />}

        </section>
    )
}

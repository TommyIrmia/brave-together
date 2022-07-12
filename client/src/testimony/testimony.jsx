import React, { useEffect, useRef, useState } from 'react'

import './testimony.scss';
import defaultImg from '../assets/images/default.png'
import vectorTop1 from '../assets/images/vectortop1.png'
import vectorTop2 from '../assets/images/vectortop2.png'
import vectorBottom from '../assets/images/vectorbottom.png'
import pen from '../assets/images/pen.png'
import calendar from '../assets/images/calendar.png'
import SelectedQuotes from '../selectedQuotes/SelectedQuotes';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Testimony = ({ match }) => {

    const [story, setStory] = useState(null)
    const [isTextChosen, setIsTextChosen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const selectedText = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const { storyId } = match.params;
        if (!storyId) setIsErr(true)
        else loadStoryById(storyId)

        return () => {
            selectedText.current = null
        }
    }, [match.params.storyId])

    const loadStoryById = async (storyId) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };
        try {
            const route = 'http://127.0.0.1:5000/api/story_body'
            const { data } = await axios.get(route, { params: { id: storyId } }, axiosConfig)
            setStory(data.story)
        } catch (err) {
            console.log(err)
            setIsErr(true)
        }
    }

    const onQuoteText = () => {
        if (isTextChosen && selectedText.current) {
            const { storyId } = match.params;
            history.push({
                pathname: '/templateEdit',
                state: { txt: selectedText.current, storyId }
            })
        }
    }

    const chooseText = (ev) => {
        ev.stopPropagation()
        const txt = window.getSelection().toString()
        selectedText.current = txt || null
        setIsTextChosen(!!txt)
    }

    const onToggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    if (isErr) return <div className="testimony-container">לא נמצא סיפור מתאים</div>
    if (!story) return <div>Loading..</div>
    return (
        <section className="testimony-container" onClick={chooseText}>

            <div className="btns-container">
                <button className="prev-quotes-btn chosen">קריאת סיפור</button>
                <button className="prev-quotes-btn">ציטוטים</button>
                <button className="prev-quotes-btn ">מאגר סיפורים</button>
            </div>


            <div className="testimony-content">
                <div className="desktop-only">
                    <div className="storyline">
                        <a>ראשי</a><span>{'>>'}</span>
                        <a>קריאת סיפור</a><span>{'>>'}</span>
                        <a>{story.heroName}</a>
                    </div>
                    <div className="choose-text">בחר טקסט מעצים על מנת לשתף ציטוט </div>
                </div>


                <div className="testimony-hero-container">
                    <div className="hero-details">
                        <h2 className="hero-name">{story.heroName}</h2>
                        <div className="sub-details">
                            <p className="hero-author"> <img className="sm-img" src={pen} /> מחבר.ת הסיפור </p>
                            <p className="date"><img className="sm-img" src={calendar} /> {story.date} </p>
                        </div>
                    </div>

                    <div className="hero-img">
                        <img src={story.imgUrl ? story.imgUrl : defaultImg} alt="Hero Image"
                            className={story.imgUrl ? '' : 'default'} />
                    </div>

                    <div className="vector top1-vector"><img src={vectorTop1} /></div>
                    <div className="vector top2-vector"><img src={vectorTop2} /></div>
                    <div className="vector bottom-vector"><img src={vectorBottom} /></div>
                </div>

                <div className="testimony-details" onClick={chooseText} onTouchEnd={chooseText}>
                    {story.text}
                </div>
            </div>

            <div className="testimony-quotes" >
                <div className="chosen-quotes" onClick={onToggleModal}>ציטוטים נבחרים</div>
                <div className={isTextChosen ? 'choose-text chosen' : 'choose-text'}
                    onClick={onQuoteText}>
                    {!isTextChosen && <p>בחר טקסט מעצים על מנת לשתף ציטוט</p>}
                    {isTextChosen && <p>צטט</p>}
                </div>
            </div>

            {isModalOpen && <SelectedQuotes quotes={story.quotes} match={match} history={history}
                onToggleModal={onToggleModal} onChooseText={onQuoteText} />}

        </section>
    )
}

export default Testimony
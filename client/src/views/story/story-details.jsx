import React, { useEffect, useRef, useState } from 'react'

import defaultImg from '../../assets/images/default.png'
import vectorTop1 from '../../assets/images/vectortop1.png'
import vectorTop2 from '../../assets/images/vectortop2.png'
import vectorBottom from '../../assets/images/vectorbottom.png'
import pen from '../../assets/images/pen.png'
import calendar from '../../assets/images/calendar.png'
import { SelectedQuotes } from '../../cmps/quote/selected-quotes';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const StoryDetails = ({ match }) => {

    const [story, setStory] = useState(null)
    const [isTextChosen, setIsTextChosen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const selectedText = useRef(null)
    const navigate = useNavigate()

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
            navigate({
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

    if (isErr) return <div className="testimony-container">???? ???????? ?????????? ??????????</div>
    if (!story) return <div>Loading..</div>
    return (
        <section className="testimony-container" onClick={chooseText}>

            <div className="btns-container">
                <button className="prev-quotes-btn chosen">?????????? ??????????</button>
                <button className="prev-quotes-btn">??????????????</button>
                <button className="prev-quotes-btn ">???????? ??????????????</button>
            </div>


            <div className="testimony-content">
                <div className="desktop-only">
                    <div className="storyline">
                        <a>????????</a><span>{'>>'}</span>
                        <a>?????????? ??????????</a><span>{'>>'}</span>
                        <a>{story.heroName}</a>
                    </div>
                    <div className="choose-text">?????? ???????? ?????????? ???? ?????? ???????? ?????????? </div>
                </div>


                <div className="testimony-hero-container">
                    <div className="hero-details">
                        <h2 className="hero-name">{story.heroName}</h2>
                        <div className="sub-details">
                            <p className="hero-author"> <img className="sm-img" src={pen} /> ????????.?? ???????????? </p>
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
                <div className="chosen-quotes" onClick={onToggleModal}>?????????????? ????????????</div>
                <div className={isTextChosen ? 'choose-text chosen' : 'choose-text'}
                    onClick={onQuoteText}>
                    {!isTextChosen && <p>?????? ???????? ?????????? ???? ?????? ???????? ??????????</p>}
                    {isTextChosen && <p>??????</p>}
                </div>
            </div>

            {isModalOpen && <SelectedQuotes quotes={story.quotes} match={match} navigate={navigate}
                onToggleModal={onToggleModal} onChooseText={onQuoteText} />}

        </section>
    )
}

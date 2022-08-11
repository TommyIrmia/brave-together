import React, { useRef, useEffect } from 'react'
import leftArrow from '../../../assets/images/templateEdit/utils/left.png'
import rightArrow from '../../../assets/images/templateEdit/utils/right.png'

export const OptionsContainer = ({ options, setOption, children }) => {
    const scrollContainerRef = useRef()

    useEffect(() => {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }, [options])

    const onChooseOption = (option) => {
        if (!options) return;
        const subTypes = options.map(currOption => {
            return {
                ...currOption,
                isChosen: (option.type === currOption.type)
            }
        })
        setOption(prevOption => ({ ...prevOption, subTypes }))
    }

    const onHandleScroll = (diff) => {
        scrollContainerRef.current.scrollTo(
            {
                left: scrollContainerRef.current.scrollLeft + diff,
                behavior: 'smooth'
            }
        );
    }

    return (
        <div className="tool-options-container">

            {options && <div className="sub-tools-container">
                {options.map(opt => <p key={opt.type}
                    className={opt.isChosen ? "chosen" : ''}
                    onClick={() => onChooseOption(opt)}>{opt.name}</p>)}
            </div>}

            <div className={'sub-options-container' + (options.length ? '' : ' frames-container')}>
                <div className="arrow" onClick={() => onHandleScroll(200)}>
                    <img alt="right-arrow" src={rightArrow} />
                </div>

                <section className="choose-container" ref={scrollContainerRef}>
                    {children}
                </section>

                <div className="arrow" onClick={() => onHandleScroll(-200)}>
                    <img alt="left-arrow" src={leftArrow} />
                </div>
            </div>
        </div>
    )
}

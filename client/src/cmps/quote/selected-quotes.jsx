import React from 'react'
import ExitIcon from '../../assets/images/exit-icon.png'

export function SelectedQuotes({ quotes, onToggleModal, onChooseText, match, navigate }) {
    console.log('quotes', quotes);


    const handleClick = (e) => {
        onToggleModal();
        onChooseText();
    }

    const onChooseQuote = (txt) => {
        if (!txt) return;
        const { storyId } = match.params;
        navigate({
            pathname: '/templateEdit',
            state: { txt, storyId }
        })
    }

    return (
        <div className='selected-quotes'>
            <div onClick={onToggleModal} className='icon-container pointer'>
                <img src={ExitIcon} />
            </div>
            <section className='content'>
                <h1>ציטוטים נבחרים</h1>
                <div className='quotes-container'>
                    {quotes &&
                        quotes.map(currQuote => {
                            return <Quote onChooseQuote={onChooseQuote} quote={currQuote}></Quote>
                        })
                    }
                </div>
                <div className='or-section'><span>או</span></div>
                <button className='pointer' onClick={handleClick}>סימון חופשי</button>
            </section>
        </div>
    )
}


function Quote({ quote, onChooseQuote }) {
    return (
        <div onClick={() => onChooseQuote(quote.txt)} className='quote'>
            <p>{quote.txt}</p>
        </div>
    )
}





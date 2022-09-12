import React from 'react'
import ExitIcon from '../../assets/images/exit-icon.png'

export function SelectedQuotes({ quotes, onToggleModal, onChooseText, storyId, navigate }) {
  console.log('quotes', quotes)

  const handleClick = () => {
    onToggleModal()
    onChooseText()
  }

  const onChooseQuote = (txt) => {
    if (!txt) return
    navigate(`/quote/edit`, { state: { txt } })
  }

  return (
    <div className="selected-quotes">
      <div onClick={onToggleModal} className="icon-container pointer">
        <img src={ExitIcon} />
      </div>
      <section className="content">
        <h1>ציטוטים נבחרים</h1>
        <div className="quotes-container">
          {quotes &&
            quotes.map((quote) => {
              return <Quote onChooseQuote={onChooseQuote} quote={quote} key={quote} />
            })}
        </div>
        <div className="or-section">
          <span>או</span>
        </div>
        <button className="pointer" onClick={handleClick}>
          סימון חופשי
        </button>
      </section>
    </div>
  )
}

function Quote({ quote, onChooseQuote }) {
  console.log(quote)
  return (
    <div onClick={() => onChooseQuote(quote)} className="quote">
      <p>{quote}</p>
    </div>
  )
}

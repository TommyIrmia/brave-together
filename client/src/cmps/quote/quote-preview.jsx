import { QuoteBtns } from './quote-btns'
import { QuoteToolBar } from './quote-toolbar'

export const QuotePreview = ({ quote }) => {
  return (
    <div className="quote-preview" style={getQuoteStyle(quote.background)}>
      <div className="quote-content" style={getQuoteContentStyle(quote.txt)}>
        <p className="quote-text">"{quote.txt.content}"</p>
        <p className="hero-name">-{quote.story.heroName}-</p>
      </div>
      <section className="quote-footer">
        <QuoteBtns />
        <QuoteToolBar />
      </section>
    </div>
  )
}

const getQuoteStyle = ({ attr }) => {
  return {
    backgroundColor: attr || '#E05555',
  }
}

const getQuoteContentStyle = ({ fontColor, fontFamily, fontSize }) => {
  return {
    color: fontColor || '#000',
    fontFamily: fontFamily || 'Rubik',
    fontSize: fontSize || '1rem',
  }
}

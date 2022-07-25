export const QuotePreview = ({ quote }) => {
  return (
    <div className="quote-preview">
      <p className="quote-content" style={getQuoteStyle(quote.txt)}>
        {quote.txt.content}
      </p>
    </div>
  )
}

const getQuoteStyle = ({ fontColor, fontFamily, fontSize }) => {
  return {
    color: fontColor || '#000',
    fontFamily: fontFamily || 'Rubik',
    fontSize: fontSize || '1rem',
  }
}

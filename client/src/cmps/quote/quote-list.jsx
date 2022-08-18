import { QuotePreview } from './quote-preview'

export const QuoteList = ({ quotes }) => {
  return <div className="quote-list">{quotes ? quotes.map((quote) => <QuotePreview key={quote._id} quote={quote} />) : <p>There are no quotes</p>}</div>
}

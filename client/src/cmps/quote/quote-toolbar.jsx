import bookmark from '../../assets/images/quote-toolbar/bookmark-ico.svg'
import edit from '../../assets/images/quote-toolbar/edit-ico.svg'
import share from '../../assets/images/quote-toolbar/share-ico.svg'

import { toggleSharing, selectQuoteToEdit } from '../../store/quote/quote.action'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const QuoteToolBar = ({ quoteId }) => {
  const dispatch = useDispatch()

  const onToggleSharing = () => {
    dispatch(toggleSharing())
  }

  const onEditQuote = () => {
    dispatch(selectQuoteToEdit({ quoteId }))
  }

  return (
    <section className="quote-toolbar">
      <div className="icons-container">
        <div className="left-side">
          <img src={bookmark} alt="" />
          <Link to={`edit/${quoteId}`}>
            <img src={edit} alt="" onClick={onEditQuote} />
          </Link>
        </div>
        <div className="right-side">
          <img onClick={() => onToggleSharing()} src={share} alt="" />
        </div>
      </div>
    </section>
  )
}

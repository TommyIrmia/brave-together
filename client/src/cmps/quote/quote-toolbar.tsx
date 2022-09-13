import bookmark from '../../assets/images/quote-toolbar/bookmark-ico.svg'
import edit from '../../assets/images/quote-toolbar/edit-ico.svg'
import share from '../../assets/images/quote-toolbar/share-ico.svg'

import { toggleSharing, selectQuoteToEdit } from '../../store/quote/quote.action'

import { useAppDispatch } from '../../models/interfaces/IRedux.interface'
import { useNavigate } from 'react-router-dom'

export const QuoteToolBar = ({ quoteId }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onToggleSharing = () => {
    dispatch<any>(toggleSharing())
  }

  const onEditQuote = async () => {
    await dispatch<any>(selectQuoteToEdit({ quoteId, txt: '' }))
    navigate(`edit/${quoteId}`)
  }

  return (
    <section className="quote-toolbar">
      <div className="icons-container">
        <div className="left-side">
          <img src={bookmark} alt="" />
          <img src={edit} alt="" onClick={onEditQuote} />
        </div>
        <div className="right-side">
          <img onClick={() => onToggleSharing()} src={share} alt="" />
        </div>
      </div>
    </section>
  )
}

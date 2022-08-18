import bookmark from '../../assets/images/quote-toolbar/bookmark-ico.svg'
import edit from '../../assets/images/quote-toolbar/edit-ico.svg'
import share from '../../assets/images/quote-toolbar/share-ico.svg'

import { toggleSharing } from '../../store/quote/quote.action'

import { useDispatch } from 'react-redux'

export const QuoteToolBar = () => {
  const dispatch = useDispatch()

  const onToggleSharing = () => {
    dispatch(toggleSharing())
  }

  return (
    <section className="quote-toolbar">
      <div className="icons-container">
        <div className="left-side">
          <img src={bookmark} alt="" />
          <img src={edit} alt="" />
        </div>
        <div className="right-side">
          <img onClick={() => onToggleSharing()} src={share} alt="" />
        </div>
      </div>
    </section>
  )
}

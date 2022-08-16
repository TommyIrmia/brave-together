import { useState } from 'react'
import bookmark from '../../assets/images/quote-toolbar/bookmark-ico.svg'
import edit from '../../assets/images/quote-toolbar/edit-ico.svg'
import share from '../../assets/images/quote-toolbar/share-ico.svg'
import { Share } from '../share/share'

export const QuoteToolBar = () => {
  const [isSharing, setIsSharing] = useState(false)
  return (
    <section className="quote-toolbar">
      <div className="icons-container">
        <div className="left-side">
          <img src={bookmark} alt="" />
          <img src={edit} alt="" />
        </div>
        <div className="right-side">
          <img src={share} alt="" onClick={() => setIsSharing(!isSharing)} />
        </div>
      </div>
      {/* {isSharing && <Share />} */}
    </section>
  )
}

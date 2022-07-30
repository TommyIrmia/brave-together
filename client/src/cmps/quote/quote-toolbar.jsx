import bookmark from '../../assets/images/quote-toolbar/bookmark-ico.svg'
import edit from '../../assets/images/quote-toolbar/edit-ico.svg'
import share from '../../assets/images/quote-toolbar/share-ico.svg'

export const QuoteToolBar = () => {
  return (
    <section className="quote-toolbar">
      <div className="icons-container">
        <div className="left-side">
          <img src={bookmark} alt="" />
          <img src={edit} alt="" />
        </div>
        <div className="right-side">
          <img src={share} alt="" />
        </div>
      </div>
    </section>
  )
}

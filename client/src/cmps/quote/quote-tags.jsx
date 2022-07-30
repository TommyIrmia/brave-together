export const QuoteTags = ({ tags }) => {
  return <div className="quote-tags-container">{tags.length > 0 && tags.map((tag) => <button>{tag}</button>)}</div>
}

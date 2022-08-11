import { useEffect, useState } from 'react'

export const QuotePaging = ({ numOfQuotes, currentPage }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [numOfPages, setNumOfPages] = useState()

  useEffect(() => {
    setNumOfPages(Math.ceil(numOfQuotes / itemsPerPage))
  }, [])

  return (
    <div className="paging-container">
      <button>{`< הקודם`}</button>
      {Array.apply(null, Array(numOfPages)).map((page, idx) => (
        <button className={`btn-number ${currentPage === idx + 1 && 'current-page'}`}>{idx + 1}</button>
      ))}
      <button disabled={currentPage === numOfPages}>{`הבא >`}</button>
      <div className="total-pages-container">
        <p>סך הכל {numOfPages} עמודים</p>
      </div>
      <div className="move-to-container">
        <p>לך לעמוד:</p>
        <input type="text" />
        <button disabled={currentPage === 1}>שנה</button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'

export const QuotePaging = ({ numOfItems, setPage, currentPage }) => {
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [numOfPages, setNumOfPages] = useState()

  useEffect(() => {
    setNumOfPages(Math.ceil(numOfItems / itemsPerPage))
  }, [numOfItems])

  const moveToPage = (page) => {
    if (page < 1 || page > numOfPages || page === currentPage) return
    setPage(page)
  }

  return (
    <div className="paging-container">
      <button disabled={currentPage === 0} onClick={() => moveToPage(currentPage - 1)}>{`< הקודם`}</button>
      {Array.apply(null, Array(numOfPages)).map((page, idx) => (
        <button key={idx} className={`btn-number ${currentPage === idx + 1 && 'current-page'}`} onClick={() => moveToPage(idx + 1)}>
          {idx + 1}
        </button>
      ))}
      <button disabled={currentPage === numOfPages} onClick={() => moveToPage(currentPage + 1)}>{`הבא >`}</button>
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

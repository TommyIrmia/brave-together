import { useEffect, useState } from 'react'

export const QuotePaging = ({ numOfQuotes, currentPage }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [numOfPages, setNumOfPages] = useState()

  useEffect(() => {
    setNumOfPages(Math.ceil(numOfQuotes / itemsPerPage))
  }, [])

  return (
    <div className="paging-container">
      <button>{`< Previous`}</button>
      {Array.apply(null, Array(5)).map((page, idx) => (
        <button className={`btn-number ${currentPage === idx + 1 && 'current-page'}`}>{idx + 1}</button>
      ))}
      <button>{`Next >`}</button>
      <div className="total-pages-container">
        <p>Total of {numOfPages} pages</p>
      </div>
      <div className="move-to-container">
        <p>Go to Page</p>
        <input type="text" />
        <button>Go</button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'

export const Pagination = ({ numOfItems, setPage, currentPage, itemsPerPage }) => {
  const [numOfPages, setNumOfPages] = useState()
  const [pageToJump, setPageToJump] = useState('')

  useEffect(() => {
    setNumOfPages(Math.ceil(numOfItems / itemsPerPage))
  }, [numOfItems])

  const moveToPage = (page, ev) => {
    ev?.preventDefault()
    if (!page || page < 1 || page > numOfPages || page === currentPage) return
    setPage(page)
  }

  const onValueChange = (ev) => {
    const value = ev.target.value
    setPageToJump(+value || '')
  }

  return (
    <div className="pagination-container">
      <div className="paging-btns-container">
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
      </div>
      <div className="move-to-container">
        <p>לך לעמוד:</p>
        <form onSubmit={(ev) => moveToPage(pageToJump || currentPage, ev)}>
          <input type="text" value={pageToJump} onChange={(ev) => onValueChange(ev)} />
          <button>שנה</button>
        </form>
      </div>
    </div>
  )
}

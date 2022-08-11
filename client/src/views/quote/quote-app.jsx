import { useEffect, useState } from 'react'
import { quoteService } from '../../services/api/quote.service'
import { QuoteList } from '../../cmps/quote/quote-list'
import { QuoteFilter } from '../../cmps/quote/quote-filter'
import { QuotePaging } from '../../cmps/quote/quote-paging'

export const QuoteApp = () => {
  const [quotes, setQuotes] = useState()
  const [page, setPage] = useState(1)
  const [quotesToDisplay, setQuotesToDisplay] = useState()
  useEffect(() => {
    getQuotes()
  }, [])

  const getQuotes = async () => {
    const quotesFromDb = await quoteService.getQuotes()
    setQuotes(quotesFromDb)
    setQuotesToDisplay(quotesFromDb)
  }

  const moveToPage = (diff) => {
    setPage((prevState) => prevState + diff)
  }

  return (
    <div>
      <QuoteFilter quotes={quotes} setFilteredQuotes={setQuotesToDisplay} />
      <QuoteList quotes={quotesToDisplay} />
      {quotes && <QuotePaging moveToPage={moveToPage} numOfQuotes={quotes.length} currentPage={page} />}
    </div>
  )
}

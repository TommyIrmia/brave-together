import { useEffect, useState } from 'react'
import { quoteService } from '../../services/api/quote.service'
import { QuoteList } from '../../cmps/quote/quote-list'
import { QuoteFilter } from '../../cmps/quote/quote-filter'

export const QuoteApp = () => {
  const [quotes, setQuotes] = useState()
  const [quotesToDisplay, setQuotesToDisplay] = useState()
  useEffect(() => {
    getQuotes()
  }, [])

  const getQuotes = async () => {
    const quotesFromDb = await quoteService.getQuotes()
    setQuotes(quotesFromDb)
    setQuotesToDisplay(quotesFromDb)
  }

  return (
    <div>
      <QuoteFilter quotes={quotes} setFilteredQuotes={setQuotesToDisplay} />
      <QuoteList quotes={quotesToDisplay} />
    </div>
  )
}

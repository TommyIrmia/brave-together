import { useEffect, useState } from 'react'
import { quoteService } from '../../services/api/quote.service'
import { QuoteList } from '../../cmps/quote/quote-list'

export const QuoteApp = () => {
  const [quotes, setQuotes] = useState()
  useEffect(() => {
    getQuotes()
  }, [])

  const getQuotes = async () => {
    const quotesFromDb = await quoteService.getQuotes()
    setQuotes(quotesFromDb)
  }

  return (
    <div>
      <QuoteList quotes={quotes} />
    </div>
  )
}

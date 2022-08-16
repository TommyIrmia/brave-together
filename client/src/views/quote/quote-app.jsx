import { useEffect, useState } from 'react'
import { quoteService } from '../../services/api/quote.service'
import { QuoteList } from '../../cmps/quote/quote-list'
import { QuoteFilter } from '../../cmps/quote/quote-filter'
import { QuotePaging } from '../../cmps/quote/quote-paging'
import { Share } from '../../cmps/share/share'
import { getQuotes, setFilterPage } from '../../store/quote/quote.action'
import { useDispatch, useSelector } from 'react-redux'

export const QuoteApp = () => {
  const dispatch = useDispatch()
  const { quotes, filterBy } = useSelector((storeState) => storeState.quoteModule)
  useEffect(() => {
    dispatch(getQuotes(filterBy))
  }, [filterBy])

  const setPage = (page) => {
    // console.log(page)
    dispatch(setFilterPage(page))
  }

  return (
    <div>
      {/* <QuoteFilter quotes={quotes} /> */}
      <QuoteList quotes={quotes} />
      {/* <Share /> */}
      {quotes && <QuotePaging numOfItems={quotes.length} setPage={setPage} currentPage={filterBy.page} />}
    </div>
  )
}

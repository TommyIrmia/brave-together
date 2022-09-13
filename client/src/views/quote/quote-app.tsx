import { useEffect, useState } from 'react'
import { quoteService } from '../../services/api/quote.service'
import { QuoteList } from '../../cmps/quote/quote-list'
import { QuoteFilter } from '../../cmps/quote/quote-filter'
import { Pagination } from '../../cmps/quote/pagination'
import { Share } from '../../cmps/share/share'
import { getQuotes, setFilterPage, toggleSharing } from '../../store/quote/quote.action'
import { useAppDispatch, useAppSelector } from '../../models/interfaces/IRedux.interface'

export const QuoteApp = () => {
  const dispatch = useAppDispatch()
  const { quotes, filterBy, totalQuotesCount, isSharing } = useAppSelector((storeState) => storeState.quoteModule)
  useEffect(() => {
    dispatch<any>(getQuotes(filterBy))
  }, [filterBy])

  const setPage = (page) => {
    dispatch<any>(setFilterPage(page))
  }

  const onToggleSharing = () => {
    dispatch<any>(toggleSharing())
  }

  return (
    <div>
      {/* <QuoteFilter quotes={quotes} /> */}
      <QuoteList quotes={quotes} />
      <Share isOpen={isSharing} onClose={onToggleSharing} />
      {quotes && <Pagination numOfItems={totalQuotesCount} itemsPerPage={filterBy.quotesPerPage} setPage={setPage} currentPage={filterBy.page} />}
    </div>
  )
}

import { useEffect } from 'react'
import { useState } from 'react'

export const QuoteFilter = ({ quotes, setFilteredQuotes }) => {
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    if (!quotes) return
    filterQuotes()
  }, [filterBy])

  const handleChange = (ev) => {
    const value = ev.target.value
    setFilterBy(value)
  }

  const filterQuotes = () => {
    console.log('filtering...')
    const filteredQuotes = quotes.filter((quote) => {
      const { story, txt } = quote
      if (story.title.includes(filterBy) || story.heroName.includes(filterBy) || txt.content.includes(filterBy)) {
        return quote
      }
    })

    setFilteredQuotes(filteredQuotes)
  }

  return (
    <section className="quote-filter">
      <form onSubmit={filterQuotes}>
        <input type="text" value={filterBy} onChange={handleChange} />
      </form>
    </section>
  )
}

import { QuoteTags } from './quote-tags'
import { QuoteToolBar } from './quote-toolbar'
import { storyService } from '../../services/api/story.service'
import { useEffect, useState } from 'react'

export const QuotePreview = ({ quote }) => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    getStoryTags(quote.story._id)
  }, [])

  const getStoryTags = async (storyId) => {
    const story = await storyService.getById(storyId)
    return setTags(story.tags)
  }

  return (
    <div className="quote-preview" style={getQuoteStyle(quote.background)}>
      <div className="quote-content" style={getQuoteContentStyle(quote.txt)}>
        <p className="quote-text">"{quote.txt.content}"</p>
        <p className="hero-name">-{quote.story.heroName}-</p>
      </div>
      <section className="quote-footer">
        <QuoteTags tags={tags} />
        <QuoteToolBar quoteId={quote._id} />
      </section>
    </div>
  )
}

const getQuoteStyle = ({ attr }) => {
  return {
    backgroundColor: attr || '#E05555',
  }
}

const getQuoteContentStyle = ({ fontColor, fontFamily, fontSize }) => {
  return {
    color: fontColor || '#000',
    fontFamily: fontFamily || 'Rubik',
    fontSize: fontSize || '1rem',
  }
}

import { useState, useEffect } from "react"
import axios from "axios"
import { ArticleCard } from "./ArticleCard"
import { useParams } from "react-router-dom"
import { getArticles, getSingleArticle } from "./utils/axios"

export const ArticleCards = ({ article_id, showBody }) => {

  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('created_at')
  const [queryOrder, setQueryOrder] = useState('desc')

  function pingForArticles() {
    setIsLoading(true)
    if (article_id) getSingleArticle(setArticles, setIsLoading, article_id)
    else getArticles(setArticles, setIsLoading, slug, sortBy, queryOrder)
    setSortBy('created_at')
    setQueryOrder('desc')
  }

  useEffect(pingForArticles, [slug, article_id])

  return (
    <form className='parent' onSubmit={(e) => {
      e.preventDefault()
      pingForArticles()
    }}>
      {article_id ? '' : (<div className="article-card">
        <label htmlFor="sort-by">Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value='created_at'>Date</option>
          <option value='comment_count'>Comment count</option>
          <option value='votes'>Votes</option>
        </select>
        <select onChange={(e) => setQueryOrder(e.target.value)}>
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
        <button type='submit'>Go</button>
      </div>)}
      {isLoading ? (<p>Loading...</p>) : articles.map((article, index) => {
        return (<ArticleCard articles={articles} showBody={showBody} article={article} index={index} key={article.article_id} />)
      })}
    </form>
  )
}
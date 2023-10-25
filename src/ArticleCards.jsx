import { useState, useEffect } from "react"
import axios from "axios"
import { ArticleCard } from "./ArticleCard"
import { useParams } from "react-router-dom"
import { getArticles, getSingleArticle } from "./utils/axios"
import { PageSwitcher } from "./PageSwitcher"

export const ArticleCards = ({ article_id, showBody }) => {

  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('created_at')
  const [queryOrder, setQueryOrder] = useState('desc')
  const [pageNumber, setPageNumber] = useState(1)

  function pingForArticles() {
    setIsLoading(true)
    if (article_id) getSingleArticle(setArticles, setIsLoading, article_id)
    else getArticles(setArticles, setIsLoading, slug, sortBy, queryOrder,pageNumber)
    setSortBy('created_at')
    setQueryOrder('desc')
  }

  useEffect(pingForArticles, [slug, article_id,pageNumber])

  return (

    <div className='parent' >
      {article_id ? '' : (<form className="article-card" onSubmit={(e) => {
        e.preventDefault()
        setPageNumber(1)
        pingForArticles()
      }}>
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
      </form>)}
      {isLoading ? (<p>Loading...</p>) : articles.map((article) => {
        return (<ArticleCard showBody={showBody} article={article} key={article.article_id} />)
      })}
      {article_id ? '' : (<PageSwitcher pageNumber={pageNumber} setPageNumber={setPageNumber} pageLength={articles.length}/>)}
    </div>
  )
}
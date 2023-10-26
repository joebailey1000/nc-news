import { useState, useEffect } from "react"
import axios from "axios"
import { ArticleCard } from "./ArticleCard"
import { useParams } from "react-router-dom"
import { getArticles, getSingleArticle } from "./utils/axios"
import { PageSwitcher } from "./PageSwitcher"
import { useSearchParams } from "react-router-dom"

export const ArticleCards = ({ article_id, showBody }) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('created_at')
  const [queryOrder, setQueryOrder] = useState('desc')
  const [pageNumber, setPageNumber] = useState(searchParams.get('p')||1)
  const [notFound,setNotFound]=useState(false)

  function pingForArticles() {
    setIsLoading(true)
    if (article_id) getSingleArticle(setArticles, setIsLoading, article_id, setNotFound)
    else {
      getArticles(setArticles, setIsLoading, slug, sortBy, queryOrder, pageNumber, setNotFound)
      setSearchParams({
        sort_by: sortBy,
        order: queryOrder,
        p: pageNumber
      })
    }
    setSortBy('created_at')
    setQueryOrder('desc')
  }

  useEffect(pingForArticles, [slug, article_id, pageNumber])

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
      {notFound?(<p>There doesn't seem to be anything here...</p>):isLoading ? (<p>Loading...</p>) : articles.map((article) => {
        return (<ArticleCard showBody={showBody} article={article} key={article.article_id} />)
      })}
      {article_id ? '' : (<PageSwitcher pageNumber={pageNumber} setPageNumber={setPageNumber} pageLength={articles.length} />)}
    </div>
  )
}
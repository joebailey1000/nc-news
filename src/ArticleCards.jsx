import { useState, useEffect } from "react"
import axios from "axios"
import { ArticleCard } from "./ArticleCard"
import { useParams } from "react-router-dom"
import { getArticles, getSingleArticle } from "./utils/axios"
import { PageSwitcher } from "./PageSwitcher"
import { useSearchParams } from "react-router-dom"

export const ArticleCards = ({ article_id, showBody }) => {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('created_at')
  const [queryOrder, setQueryOrder] = useState('desc')
  const [pageNumber, setPageNumber] = useState(1)
  const [notFound,setNotFound]=useState(false)

  const [searchParams, setSearchParams] = useSearchParams({sort_by:'created_at',order:'desc',p:pageNumber})

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
  }

  useEffect(pingForArticles, [slug, article_id, pageNumber, sortBy,queryOrder])

  return (

    <div className='parent' >
      {article_id ? '' : (<form className="article-card">
        <label htmlFor="sort-by">Sort by: </label>
        <select onChange={(e) => {
            setSortBy(e.target.value)
            console.log(sortBy)
            setPageNumber(1)
          }}>
          <option value='created_at'>Date</option>
          <option value='comment_count'>Comment count</option>
          <option value='votes'>Votes</option>
        </select>
        <select onChange={(e) => {
            setQueryOrder(e.target.value)
            setPageNumber(1)
          }}>
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
      </form>
      )}
      {notFound?(<p>There doesn't seem to be anything here...</p>):isLoading ? (<p>Loading...</p>) : articles.map((article) => {
        return (<ArticleCard showBody={showBody} article={article} key={article.article_id} />)
      })}
      {article_id ? '' : (<PageSwitcher pageNumber={pageNumber} setPageNumber={setPageNumber} pageLength={articles.length} />)}
    </div>
  )
}
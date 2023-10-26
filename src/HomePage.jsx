import { useState, useEffect } from "react"
import { getTopics, getArticles } from "./utils/axios"
import { Link } from "react-router-dom"
import { ArticleCard } from "./ArticleCard"

export const HomePage = ({ loggedInUser }) => {
  const [topics, setTopics] = useState([])
  const [topArticles, setTopArticles] = useState([])
  const [isTopicsLoading, setIsTopicsLoading] = useState(false)
  const [isArticlesLoading, setIsArticlesLoading] = useState(false)

  useEffect(() => {
    setIsArticlesLoading(true)
    setIsTopicsLoading(true)
    getTopics(setIsTopicsLoading, setTopics)
    getArticles(setTopArticles, setIsArticlesLoading, undefined, 'votes', 'desc', 1, () => { })
  }, [])

  return (
    <>
      {
        loggedInUser ?
          (<div className="center-div"><h2>Welcome {loggedInUser}!</h2></div>) :
          <div className="center-div"><h2>Welcome to Joey's NC News!</h2></div>
      }
      <div className="center-div">
        <div className="parent">
          <h3 className="article-card">Hot Topics</h3>
          {isTopicsLoading ? (<p>Loading...</p>) : topics.slice(0, 2).map(topic => {
            return (
              <div key={topic.slug} className='article-card'>
                <h4><Link to={`/topics/${topic.slug}`}>{topic.slug}</Link></h4>
                <p>{topic.description}</p>
              </div>
            )
          })}
          <Link to='/topics'>Browse all Topics</Link>
        </div>
      </div>
      <div className="center-div">
        <div className="parent">
        <h3 className="article-card">Top Articles</h3>
          {isArticlesLoading ? (<p>Loading...</p>) : topArticles.map(article => {
            return (
              <ArticleCard article={article} showBody={false} />
            )
          })}
          <Link to='/topics'>Browse all Articles</Link>
        </div>
      </div>
    </>
  )
}
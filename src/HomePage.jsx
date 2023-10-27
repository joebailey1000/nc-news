import { useState, useEffect } from "react"
import { getTopics, getArticles } from "./utils/axios"
import { Link } from "react-router-dom"
import { ArticleCard } from "./ArticleCard"
import { useNavigate } from "react-router-dom"

export const HomePage = ({ loggedInUser }) => {
  const [topics, setTopics] = useState([])
  const [topArticles, setTopArticles] = useState([])
  const [isTopicsLoading, setIsTopicsLoading] = useState(false)
  const [isArticlesLoading, setIsArticlesLoading] = useState(false)
  const navigate=useNavigate()

  useEffect(() => {
    setIsArticlesLoading(true)
    setIsTopicsLoading(true)
    getTopics(setIsTopicsLoading, setTopics)
    getArticles(setTopArticles, setIsArticlesLoading, undefined, 'votes', 'desc', 1, () => { })
  }, [])

  return (
    < div id='home-parent'>
      {
        loggedInUser ?
          (<div className="center-div" id='home-welcome'><h2>Welcome {loggedInUser}!</h2></div>) :
          <div className="center-div" id='home-welcome'><h2>Welcome to Joey's NC News!</h2></div>
      }
      <div className="center-div">
        <div className="parent" id='home-topics'>
          <h3 className="article-card">Hot Topics</h3>
          {isTopicsLoading ? (<p>Loading...</p>) : topics.slice(0, 2).map(topic => {
            return (
              <div key={topic.slug} className='article-card'>
                <button className="article-header-button" onClick={()=>navigate(`/topics/${topic.slug}`)}><h4>{topic.slug[0].toUpperCase()+topic.slug.slice(1)}</h4></button>
                <p>{topic.description}</p>
              </div>
            )
          })}
          <button className='link-button' onClick={()=>navigate('/topics')}>Browse all Topics {'>'}</button>
        </div>
      </div>
      <div className="center-div">
        <div className="parent" id='home-articles'>
        <h3 className="article-card">Top Articles</h3>
          {isArticlesLoading ? (<p>Loading...</p>) : topArticles.slice(0,5).map(article => {
            return (
              <ArticleCard article={article} showBody={false} />
            )
          })}
          <button className='link-button' onClick={()=>navigate('/articles')}>Browse all Articles {'>'}</button>
        </div>
      </div>
    </div>
  )
}
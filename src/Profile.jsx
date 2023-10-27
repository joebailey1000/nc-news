import { useState, useEffect } from "react"
import { getUserByName, getArticlesByUsername, getCommentsByUsername } from "./utils/axios"
import { ArticleCard } from "./ArticleCard"
import { PageSwitcher } from "./PageSwitcher"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { CommentCards } from './CommentCards'

export const Profile = ({ loggedInUser }) => {
  const [currUser, setCurrUser] = useState({})
  const [userArticles, setUserArticles] = useState([])
  const [userComments, setUserComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [articlesOrComments, setArticlesOrComments] = useState('articles')
  const params = useParams()

  useEffect(() => {
    console.log(params)
    if (loggedInUser) {
      setPageNumber(1)
      setIsLoading(true)
      getUserByName(loggedInUser, setCurrUser),
        getArticlesByUsername(loggedInUser, setUserArticles, pageNumber)
      getCommentsByUsername(loggedInUser, setUserComments, pageNumber)
    } else if (params.username) {
      setPageNumber(1)
      setIsLoading(true)
      getUserByName(params.username, setCurrUser),
        getArticlesByUsername(params.username, setUserArticles, pageNumber)
      getCommentsByUsername(params.username, setUserComments, pageNumber)
    }

  }, [loggedInUser])

  useEffect(() => setIsLoading(false), [userArticles, currUser])

  useEffect(() => getArticlesByUsername(currUser.username, setUserArticles, pageNumber), [pageNumber])

  function articlesCommentsRender() {
    if (articlesOrComments === 'articles') {
      return !userArticles.length ? (<p>There isn't anything here yet..</p>) : userArticles.map((article) => {
        return (<ArticleCard showBody={false} article={article} key={article.article_id} />)
      })
    } else {
      return !userComments.length ? (<p>There isn't anything here yet..</p>) : userComments.map((comment) => {
        return (<CommentCards comments={userComments} comment={comment} loggedInUser={loggedInUser} setThisArticleComments={setUserComments} key={comment.comment_id} />)
      })
    }
  }

  return currUser.username ? (
    <div id='profile-master'>
      <div className="center-div wrap-div">
        <div className="parent" id='profile-pic-holder'>
          <div className="wrap-div">
            <img id='profile-pic' src={currUser.avatar_url} />
            <h2 id='username'>{currUser.username}</h2>
          </div>
        </div>
      </div>
      <div className="center-div">
        <div className='parent' id='profile-parent'>
          <div className="article-card">
            <div className="flex-div">
              <button className='profile-toggle' disabled={articlesOrComments === 'articles'} onClick={() => {
                setArticlesOrComments('articles')
                setPageNumber(1)
              }}><h3>Articles</h3></button>
              <button className='profile-toggle' disabled={articlesOrComments === 'comments'} onClick={() => {
                setArticlesOrComments('comments')
                setPageNumber(1)
              }}><h3>Comments</h3></button>
            </div>
          </div>
          {isLoading ? (<p>Loading...</p>) : articlesCommentsRender()}
          <PageSwitcher pageNumber={pageNumber} setPageNumber={setPageNumber} pageLength={userArticles.length} />
        </div>
      </div>
    </div>
  ) : (
    <div className="center-div">
      <div className="parent">
        <p>You aren't logged in yet!</p>
        <Link to='/login'>Log In</Link>
      </div>
    </div>
  )
}
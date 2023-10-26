import { useState, useEffect } from "react"
import { getUserByName, getArticlesByUsername } from "./utils/axios"
import { ArticleCard } from "./ArticleCard"
import { PageSwitcher } from "./PageSwitcher"
import { Link } from "react-router-dom"

export const Profile=({loggedInUser})=>{
  const [currUser,setCurrUser]=useState({})
  const [userArticles,setUserArticles]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [pageNumber,setPageNumber]=useState(1)

  useEffect(()=>{
    if (loggedInUser){
      setPageNumber(1)
      setIsLoading(true)
      getUserByName(loggedInUser,setCurrUser),
      getArticlesByUsername(loggedInUser, setUserArticles, pageNumber)
    }
    
  },[loggedInUser])

  useEffect(()=>setIsLoading(false),[userArticles,currUser])

  useEffect(()=>getArticlesByUsername(loggedInUser,setUserArticles,pageNumber),[pageNumber])

  return loggedInUser?(
    <>
      <div className="center-div">
        <div className="parent">
        <div id="profile-grid">
          <img id='profile-pic' src={currUser.avatar_url}/>
          <h2>{loggedInUser}</h2>
          <p>{userArticles.reduce((acc,curr)=>acc+curr.votes,0)} total votes</p>
        </div>
        </div>
      </div>
      <div className="center-div">
      <div className='parent' >
        <div className="article-card">
          <h3>My Articles</h3>
        </div>
        {isLoading ? (<p>Loading...</p>) : !userArticles.length ? (<p>There isn't anything here yet..</p>) : userArticles.map((article) => {
          return (<ArticleCard showBody={false} article={article} key={article.article_id} />)
        })}
        <PageSwitcher pageNumber={pageNumber} setPageNumber={setPageNumber} pageLength={userArticles.length} />
      </div>
    </div>
    </>
  ):(
    <div className="center-div">
  <div className="parent">
    <p>You aren't logged in yet!</p>
    <Link to='/login'>Log In</Link>
  </div>
  </div>
  )
}
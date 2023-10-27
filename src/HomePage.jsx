import { useState, useEffect } from "react"
import { getTopics, getArticles, postArticle } from "./utils/axios"
import { Link } from "react-router-dom"
import { ArticleCard } from "./ArticleCard"
import { useNavigate } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"

export const HomePage = ({ loggedInUser }) => {
  const [topics, setTopics] = useState([])
  const [topArticles, setTopArticles] = useState([])
  const [isTopicsLoading, setIsTopicsLoading] = useState(false)
  const [isArticlesLoading, setIsArticlesLoading] = useState(false)
  const [titleInput,setTitleInput] = useState('')
  const [bodyInput,setBodyInput] = useState('')
  const [imgInput,setImgInput] = useState('')
  const [posted,setPosted] = useState(false)
  const [postPending,setPostPending]=useState(false)
  const [topicInput,setTopicInput] = useState('coding')
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
          {!loggedInUser?'':postPending? <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#ff0800', '#ff0800', '#ff0800', '#ff0800', '#ff0800']}
          />:<form id='post-article' className='article-card' onSubmit={(e)=>{
            e.preventDefault()
            setPostPending(true)
            postArticle(setPosted,setPostPending,{
              author:loggedInUser,
              title:titleInput,
              body:bodyInput,
              topic:topicInput,
              article_img_url:imgInput
            })
            setTitleInput('')
            setBodyInput('')
            setImgInput('')
            setTopicInput('coding')
          }}>
            <h3>Post an Article</h3>
            <label className='post-article-label' htmlFor="article-title-input">Title:</label>
            <input onChange={(e)=>setTitleInput(e.target.value)} id='article-title-input' required></input>
            <label className='post-article-label' htmlFor='article-body-input'>Body:</label>
            <textarea onChange={(e)=>setBodyInput(e.target.value)} id='article-body-input' required></textarea>
            <label className='post-article-label' htmlFor="article-img-input">Image URL:</label>
            <input onChange={(e)=>setImgInput(e.target.value)} id='article-img-input' required></input>
            <div className="flex-div">
            <div>
            <label className='post-article-label' htmlFor="topic-input">Topic:</label>
            <select id='topic-input' onChange={(e)=>setTopicInput(e.target.value)}>
              {topics.map(topic=>{
                return (
                  <option value={topic.slug}>{topic.slug[0].toUpperCase()+topic.slug.slice(1)}</option>
                )
              })}
            </select>
            </div>
            <button id='post-article-button' type='submit'>Post Article</button>
            </div>
            {posted?<p>Article posted successfully!</p>:''}
          </form>}
          
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
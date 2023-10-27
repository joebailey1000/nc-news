import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTopics } from "./utils/axios"
import { useNavigate } from "react-router-dom"

export const TopicMenu = () => {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate=useNavigate()

  useEffect(() => {
    getTopics(setIsLoading, setTopics)
  }, [])

  return isLoading ? (<div className="center-div"><p>Loading...</p></div>) : (
    <>
    <div className="center-div"><h2>Topics</h2></div>
    <div className="center-div">
      <div className="parent">
        {topics.map((topic, index) => {
          return (
            <div key={topic.slug} className={index === topics.length - 1 ? '' : 'article-card'}>
              <button className='article-header-button' onClick={()=>navigate(`/topics/${topic.slug}`)}><h3>{topic.slug[0].toUpperCase()+topic.slug.slice(1)}</h3></button>
              <p>{topic.description}</p>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
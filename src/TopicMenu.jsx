import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTopics } from "./utils/axios"

export const TopicMenu = () => {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTopics(setIsLoading, setTopics)
  }, [])

  return isLoading ? (<p>Loading...</p>) : (
    <>
      <h2>Topics</h2>
      <div className="parent">
        {topics.map((topic, index) => {
          return (
            <div key={topic.slug} className={index === topics.length - 1 ? '' : 'article-card'}>
              <h4><Link to={`/topics/${topic.slug}`}>{topic.slug}</Link></h4>
              <p>{topic.description}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
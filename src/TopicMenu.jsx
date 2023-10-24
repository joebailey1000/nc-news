import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export const TopicMenu=()=>{
    const [topics,setTopics]=useState([])
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        axios.get('https://news-api-p73k.onrender.com/api/topics')
            .then(res=>{
                setIsLoading(false)
                setTopics(res.data.topics)
            })
    },[])

    return isLoading?(<p>Loading...</p>):(
        <>
            <h2>Topics</h2>
            <div className="parent">
                {topics.map((topic,index)=>{
                    console.log(topics)
                    return (
                        <div key={topic.slug} className={index===topics.length-1?'':'article-card'}>
                            <h4><Link to={`/topics/${topic.slug}`}>{topic.slug}</Link></h4>
                            <p>{topic.description}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
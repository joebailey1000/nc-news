import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArticleCard } from "./ArticleCard"
import axios from "axios"

export const TopicCards=()=>{
    const {slug}=useParams()
    const [articles,setArticles]=useState([])
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        axios.get(`https://news-api-p73k.onrender.com/api/articles?topic=${slug}`)
            .then(res=>{
                setArticles(res.data.articles)
                setIsLoading(false)
            })
    },[])

    return isLoading?(<p>Loading...</p>):(
        <>
            <h2>{slug[0].toUpperCase()+slug.slice(1)}</h2>
            <div className='parent'>
                {articles.map((article,index)=>{
                    return(<ArticleCard articles={articles} showBody={false} article={article} index={index} key={article.article_id} />)
                })}
            </div>
        </>
    )
}
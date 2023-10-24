import { useState, useEffect } from "react"
import axios from "axios"
import { ArticleCard } from "./ArticleCard"
import { useParams } from "react-router-dom"
import { getArticles } from "./utils/axios"

export const ArticleCards = ({ article_id,showBody }) => {
    const {slug}=useParams()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        getArticles(setArticles,setIsLoading,article_id,slug)

    }, [slug,article_id])
    return isLoading ? (<p>Loading...</p>) : (
        <div className='parent'>
            {articles.map((article, index) => {
                return (<ArticleCard articles={articles} showBody={showBody} article={article} index={index} key={article.article_id} />)
            })}
        </div>
    )
}
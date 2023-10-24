import { useState, useEffect } from "react"
import axios from "axios"
import comment from './assets/comment.png'
import { Link } from 'react-router-dom'
import { ArticleCard } from "./ArticleCard"

export const ArticleCards = ({ article_id }) => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if (article_id) {
            axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}`)
                .then(res => {
                    setArticles([res.data.article])
                    setIsLoading(false)
                })
        } else {
            axios.get('https://news-api-p73k.onrender.com/api/articles')
                .then(res => {
                    setArticles(res.data.articles)
                    setIsLoading(false)
                })
        }

    }, [])

    return isLoading ? (<p>Loading...</p>) : (
        <div className='parent'>
            {articles.map((article, index) => {
                return (<ArticleCard articles={articles} showBody={false} article={article} index={index} key={article.article_id} />)
            })}
        </div>
    )
}
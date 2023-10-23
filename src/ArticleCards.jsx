import { useState, useEffect } from "react"
import axios from "axios"
import comment from './assets/comment.jpg'

export const ArticleCards = ({ articles }) => {
    const [articleBodies, setArticleBodies] = useState([])
    const [articleCommentCounts, setArticleCommentCounts] = useState([])

    useEffect(() => {
        Promise.all(articles.map(article => axios.get(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`))).then(res => {
            setArticleBodies(res.map(item => item.data.article.body))
            setArticleCommentCounts(res.map(item => item.data.article.comment_count))
        }).catch(err => console.log(err))

    }, [articles])
    return (
        <div className='parent'>
            {articles.map((article, index) => {
                return (
                    <div key={article.article_id} className="article-card">
                        <div className="flex-div">
                            <h4>{article.title}</h4>
                            <p className="de-emphasise">{article.author}</p>
                            <p className="de-emphasise">{article.created_at.slice(0, 10)}</p>
                        </div>
                        <div className="flex-div">
                            <p className="body">{articleBodies[index]}</p>

                            <img className='article-img' src={article.article_img_url} />
                            <div className="vertical-div">
                                <button className="vote-button">{'>'}</button>
                                <p>{article.votes}</p>
                                <button className="vote-button">{'<'}</button>
                                <p>{articleCommentCounts[index]}</p>
                                <img className='comment-icon' src={comment}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
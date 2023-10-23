import { useState, useEffect } from "react"
import axios from "axios"
import comment from './assets/comment.png'
import { Link } from 'react-router-dom'

export const ArticleCards = ({ articles, showBody }) => {
    const [articleCommentCounts, setArticleCommentCounts] = useState([])

    useEffect(() => {
        Promise.all(articles.map(article => axios.get(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`))).then(res => {
            setArticleCommentCounts(res.map(item => item.data.article.comment_count))
        }).catch(err => console.log(err))

    }, [articles])
    return (
        <div className='parent'>
            {articles.map((article, index) => {
                return (
                    <div key={article.article_id} className="article-card">
                        <div className="vertical-div">
                            <div className="flex-div">
                                <h4><Link to={`/articles/${article.article_id}`} >{article.title}</Link></h4>
                                <div className="vertical-div">
                                    <button className="vote-button-up">{'>'}</button>
                                    <p className="vote-count">{article.votes}</p>
                                    <button className="vote-button-down">{'<'}</button>
                                </div>
                            </div>
                            {showBody ? (
                                <>
                                    <img className='article-img' src={article.article_img_url} />
                                    <p>{article.body}</p>
                                </>
                            ) : ''}
                            <div className="flex-div">
                                <p className="de-emphasise">{article.author}</p>
                                <p className="de-emphasise">{article.created_at.slice(0, 10)}</p>
                                <div className="comment-div">
                                    <img className='comment-icon' src={comment} />
                                    <p className="comment-count">{articleCommentCounts[index]}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
import { useState, useEffect } from "react"
import axios from "axios"
import comment from './assets/comment.png'
import { Link } from 'react-router-dom'
import { ArticleCard } from "./ArticleCard"

export const ArticleCards = ({ article_id, showBody }) => {
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



    // function pingVotes(increment, article, index) {
    //     const newVotes = [...votes]
    //     newVotes[index] = votes[index] + increment
    //     setVotes(newVotes)
    //     return axios.patch(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`, { inc_votes: increment })
    //         .catch(err => {
    //             setPatchErr(true)
    //             newVotes[index] = votes[index]
    //             setVotes(newVotes)
    //         })
    // }

    // function ArticleCard({ article, index }) {
    //     const [hasVoted, setHasVoted] = useState(false)
    //     console.log(hasVoted)
    //     return (
    //         <div key={article.article_id} className={index === articles.length - 1 ? '' : 'article-card'}>
    //             <div className="vertical-div">
    //                 <div className="flex-div">
    //                     <h4><Link to={`/articles/${article.article_id}`} >{article.title}</Link></h4>
    //                     <div className="vertical-div">
    //                         <button className="vote-button-up" onClick={() => {
    //                             switch (hasVoted) {
    //                                 case 'up':
    //                                     pingVotes(-1, article, index)
    //                                     break
    //                                 case 'down':
    //                                     pingVotes(2, article, index)
    //                                     break
    //                                 case false:
    //                                     setHasVoted('up')
    //                                     pingVotes(1, article, index)
    //                             }
    //                         }}>{'>'}</button>
    //                         <p className="vote-count">{votes[index]}</p>
    //                         <button className="vote-button-down" onClick={() => pingVotes(-1, article, index)}>{'<'}</button>
    //                     </div>
    //                 </div>
    //                 {showBody ? (
    //                     <>
    //                         <img className='article-img' src={article.article_img_url} />
    //                         <p>{article.body}</p>
    //                     </>
    //                 ) : ''}
    //                 <div className="flex-div">
    //                     <p className="de-emphasise">{article.author}</p>
    //                     <p className="de-emphasise">{article.created_at.slice(0, 10)}</p>
    //                     <div className="comment-div">
    //                         <img className='comment-icon' src={comment} />
    //                         <p className="comment-count">{article.comment_count}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return isLoading ? (<p>Loading...</p>) : (
        <div className='parent'>
            {articles.map((article, index) => {
                return (<ArticleCard articles={articles} showBody={showBody} article={article} index={index} key={article.article_id} />)
            })}
        </div>
    )
}
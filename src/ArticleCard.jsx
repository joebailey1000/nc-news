import { useState } from "react"
import { Link } from "react-router-dom"
import comment from './assets/comment.png'
import axios from "axios"

export const ArticleCard = ({ articles, article, showBody, index }) => {

    const [votes, setVotes] = useState(article.votes)
    const [hasVoted, setHasVoted] = useState(false)

    function pingVotes(increment, article) {
        setVotes(votes + increment)
        return axios.patch(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`, { inc_votes: increment })
            .catch(err => {
                setVotes(votes)
                alert('Something went wrong processing your vote...')
                return err
            })
    }

    return (
        <div key={article.article_id} className={index === articles.length - 1 ? '' : 'article-card'}>
            <div className="vertical-div">
                <div className="flex-div">
                    <h4><Link to={`/articles/${article.article_id}`} >{article.title}</Link></h4>
                    <div className="vertical-div">
                        <button className="vote-button-up" id={`up${article.article_id}`} onClick={() => {
                            const button = document.getElementById(`up${article.article_id}`)
                            switch (hasVoted) {
                                case 'up':
                                    button.style = ''
                                    setHasVoted(false)
                                    pingVotes(-1, article)
                                    break
                                case 'down':
                                    button.style = 'background-color:red'
                                    document.getElementById(`down${article.article_id}`).style = ''
                                    setHasVoted('up')
                                    pingVotes(2, article)
                                    break
                                case false:
                                    button.style = 'background-color:red'
                                    setHasVoted('up')
                                    pingVotes(1, article)
                            }
                        }}>{'>'}</button>
                        <p className="vote-count">{votes}</p>
                        <button className="vote-button-down" id={`down${article.article_id}`} onClick={() => {
                            const button = document.getElementById(`down${article.article_id}`)
                            switch (hasVoted) {
                                case 'up':
                                    button.style = 'background-color:blue'
                                    document.getElementById(`up${article.article_id}`).style = ''
                                    setHasVoted('down')
                                    pingVotes(-2, article)
                                    break
                                case 'down':
                                    button.style = ''
                                    setHasVoted(false)
                                    pingVotes(1, article)
                                    break
                                case false:
                                    button.style = 'background-color:blue'
                                    setHasVoted('down')
                                    pingVotes(-1, article)
                            }
                        }}>{'<'}</button>
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
                        <p className="comment-count">{article.comment_count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
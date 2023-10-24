import { useState } from "react"
import { Link } from "react-router-dom"
import comment from './assets/comment.png'
import axios from "axios"
import { upDownVote } from "./utils/axios"

export const ArticleCard = ({ articles, article, showBody, index }) => {

    const [votes, setVotes] = useState(article.votes)
    const [hasVoted, setHasVoted] = useState(false)

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
                                    upDownVote(-1, article,votes,setVotes)
                                    break
                                case 'down':
                                    button.style = 'background-color:red'
                                    document.getElementById(`down${article.article_id}`).style = ''
                                    setHasVoted('up')
                                    upDownVote(2, article,votes,setVotes)
                                    break
                                case false:
                                    button.style = 'background-color:red'
                                    setHasVoted('up')
                                    upDownVote(1, article,votes,setVotes)
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
                                    upDownVote(-2, article,votes,setVotes)
                                    break
                                case 'down':
                                    button.style = ''
                                    setHasVoted(false)
                                    upDownVote(1, article,votes,setVotes)
                                    break
                                case false:
                                    button.style = 'background-color:blue'
                                    setHasVoted('down')
                                    upDownVote(-1, article,votes,setVotes)
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
import { useState, useEffect } from "react"
import axios from "axios"
import comment from './assets/comment.png'
import { Link } from 'react-router-dom'

export const ArticleCards = ({ article_id, showBody }) => {
    const [articles, setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [patchErr,setPatchErr] = useState(false)

    useEffect(() => {
      if (article_id){
        axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}`)
        .then(res => {
            setArticles([res.data.article])
            setIsLoading(false)
        })
      } else{
        axios.get('https://news-api-p73k.onrender.com/api/articles')
        .then(res => {
            setArticles(res.data.articles)
            setIsLoading(false)
        })
      }
        
    }, [])
    
    const [votes, setVotes] = useState([])

    useEffect(() => {
        setVotes(articles.map(article => article.votes))
    }, [articles])

    useEffect(()=>{
        if (patchErr){
            alert('Something went wrong processing your vote...')
            setPatchErr(false)
        }
    },[patchErr])

    function pingVotes(increment, article, index) {
        const newVotes = [...votes]
        newVotes[index] = votes[index]+increment
        setVotes(newVotes)
        axios.patch(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`, { inc_votes: increment })
            .catch(err=>{
                setPatchErr(true)
                newVotes[index] = votes[index]
                setVotes(newVotes)
            })
    }
    return isLoading?(<p>Loading...</p>):(
        <div className='parent'>
            {articles.map((article, index) => {
                return (
                    <div key={article.article_id} className={index===articles.length-1?'':'article-card'}>
                        <div className="vertical-div">
                            <div className="flex-div">
                                <h4><Link to={`/articles/${article.article_id}`} >{article.title}</Link></h4>
                                <div className="vertical-div">
                                    <button className="vote-button-up" onClick={()=>pingVotes(1, article, index)}>{'>'}</button>
                                    <p className="vote-count">{votes[index]}</p>
                                    <button className="vote-button-down" onClick={()=>pingVotes(-1, article, index)}>{'<'}</button>
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
            })}
        </div>
    )
}
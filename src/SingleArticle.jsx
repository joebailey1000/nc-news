import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { ArticleCards } from './ArticleCards'
import { CommentCards } from './CommentCards'

export const SingleArticle=({loggedInUser})=>{
    const [thisArticleComments,setThisArticleComments]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [errState,setErrState]=useState(false)
    const {article_id}=useParams()

    const [commentInput,setCommentInput]=useState('')

    useEffect(()=>{
        axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}/comments`)
            .then(res=>{
                setThisArticleComments(res.data.comments)
                setIsLoading(false)
            })
            .catch(err=>setErrState(err))
    },[article_id])

    return errState?(
        <p>There doesn't seem to be anything here...</p>
    ):isLoading?(
        <p>Loading...</p>
    ):(
        <>
            <ArticleCards article_id={article_id} showBody={true}/>
            <form className='parent' onSubmit={(e)=>{
                e.preventDefault()
                axios.post(`https://news-api-p73k.onrender.com/api/articles/${article_id}/comments`,{username:loggedInUser,body:commentInput})
                    .then(res=>setThisArticleComments((curr)=>[res.data.comment,...curr]))
                    .catch(err=>console.log(err))
                setCommentInput('')
            }}>
                <label id='comment-input-label' htmlFor='comment-input'>Post a comment:</label>
                <div>
                <textarea id='comment-input' onChange={(e)=>{
                    setCommentInput(e.target.value)
                }}>{commentInput}</textarea>
                </div>
                <button type='submit'>{'>'}</button>
            </form>
            <CommentCards comments={thisArticleComments}/>
        </>
    )
}
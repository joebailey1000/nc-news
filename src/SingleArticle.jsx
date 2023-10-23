import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { ArticleCards } from './ArticleCards'
import { CommentCards } from './CommentCards'

export const SingleArticle=()=>{
    const [thisArticle,setThisArticle]=useState({})
    const [thisArticleComments,setThisArticleComments]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [errState,setErrState]=useState(false)
    const {article_id}=useParams()
    useEffect(()=>{
        axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}`)
            .then(res=>setThisArticle(res.data.article))
            .then(()=>axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}/comments`))
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
            <CommentCards comments={thisArticleComments}/>
        </>
    )
}
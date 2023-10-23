import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { ArticleCards } from './ArticleCards'

export const SingleArticle=()=>{
    const [thisArticle,setThisArticle]=useState({})
    const [thisArticleComments,setThisArticleComments]=useState([])
    const {article_id}=useParams()
    useEffect(()=>{
        axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}`)
            .then(res=>setThisArticle(res.data.article))
            .then(()=>axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}/comments`))
            .then(res=>setThisArticleComments(res.data.comments))
            .catch(err=>console.log(err))
    },[])
    return (
        <>
            {Object.keys(thisArticle).length?(<ArticleCards articles={[thisArticle]} showBody={true}/>):'Loading...'}
        </>
    )
}
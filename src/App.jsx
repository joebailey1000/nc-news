import { useState,useEffect } from 'react'
import { Header } from './Header'
import axios from 'axios'
import { ArticleCards } from './ArticleCards'

function App() {
  const [articles,setArticles]=useState([])

  useEffect(()=>{
    axios.get('https://news-api-p73k.onrender.com/api/articles')
      .then(res=>setArticles(res.data.articles))
  },[])

  return (
    <>
      <Header/>
      <ArticleCards articles={articles}/>
    </>
  )
}

export default App

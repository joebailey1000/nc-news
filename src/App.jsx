import { useState, useEffect } from 'react'
import { Header } from './Header'
import axios from 'axios'
import { ArticleCards } from './ArticleCards'
import { Routes, Route, Link } from 'react-router-dom'
import { SingleArticle } from './SingleArticle'

function App() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('https://news-api-p73k.onrender.com/api/articles')
      .then(res => setArticles(res.data.articles))
  }, [])

  return (
    <>
      <Header />
      <Link to='articles'>to articles</Link>
      <Routes>
        <Route path='/articles' element={<ArticleCards articles={articles} showBody={false}/>} />
        <Route path='/articles/:article_id' element={<SingleArticle/>} />
      </Routes>
    </>
  )
}

export default App

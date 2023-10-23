import { useState, useEffect } from 'react'
import { Header } from './Header'
import axios from 'axios'
import { ArticleCards } from './ArticleCards'
import { Routes, Route, Link } from 'react-router-dom'
import { SingleArticle } from './SingleArticle'

function App() {
 

  return (
    <>
      <Header />
      <Link to='articles'>to articles</Link>
      <Routes>
        <Route path='/articles' element={<ArticleCards showBody={false}/>} />
        <Route path='/articles/:article_id' element={<SingleArticle/>} />
      </Routes>
    </>
  )
}

export default App

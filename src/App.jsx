import { useState, useEffect } from 'react'
import { Header } from './Header'
import { ArticleCards } from './ArticleCards'
import { Routes, Route, Link } from 'react-router-dom'
import { SingleArticle } from './SingleArticle'

function App() {
  const [loggedInUser,setLoggedInUser]=useState('grumpy19')

  return (
    <>
      <Header />
      <Link to='articles'>to articles</Link>
      <Routes>
        <Route path='/articles' element={<ArticleCards showBody={false}/>} />
        <Route path='/articles/:article_id' element={<SingleArticle loggedInUser={loggedInUser}/>} />
      </Routes>
    </>
  )
}

export default App

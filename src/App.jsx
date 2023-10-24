import { useState, useEffect } from 'react'
import { Header } from './Header'
import { ArticleCards } from './ArticleCards'
import { Routes, Route, Link } from 'react-router-dom'
import { SingleArticle } from './SingleArticle'
import { TopicMenu } from './TopicMenu'


function App() {
  const [loggedInUser,setLoggedInUser]=useState('grumpy19')

  
  return (
    <>
      <Header />
      <Link to='articles'>to articles</Link>
      <Link to='topics'>to topics</Link>
      <Routes>
        <Route path='/articles' element={<ArticleCards/>} />
        <Route path='/articles/:article_id' element={<SingleArticle loggedInUser={loggedInUser}/>} />
        <Route path='/topics' element={<TopicMenu/>} />
        <Route path='/topics/:slug' element={<ArticleCards/>}/>
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import { Header } from './Header'
import { ArticleCards } from './ArticleCards'
import { Routes, Route, Link } from 'react-router-dom'
import { SingleArticle } from './SingleArticle'
import { TopicMenu } from './TopicMenu'
import { LogIn } from './LogIn'
import { Profile } from './Profile'
import { HomePage } from './HomePage'


function App() {
  const [loggedInUser,setLoggedInUser]=useState(false)

  
  return (
    <>
      <Header loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <Link to='articles'>to articles</Link>
      <Link to='topics'>to topics</Link>
      <Routes>
        <Route path='/' element={<HomePage loggedInUser={loggedInUser}/>}/>
        <Route path='/profile' element={<Profile loggedInUser={loggedInUser}/>}/>
        <Route path='/articles' element={<ArticleCards/>} />
        <Route path='/articles/:article_id' element={<SingleArticle loggedInUser={loggedInUser}/>} />
        <Route path='/topics' element={<TopicMenu/>} />
        <Route path='/topics/:slug' element={<ArticleCards/>}/>
        <Route path='/login' element={<LogIn setLoggedInUser={setLoggedInUser}/>}/>
        <Route path='/*' element={<p>It doesn't look like that page exists...</p>}/>
      </Routes>
    </>
  )
}

export default App

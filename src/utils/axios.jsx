import axios from "axios"

const getTopics = (setIsLoading, setTopics) => {
  return axios.get('https://news-api-p73k.onrender.com/api/topics')
    .then(res => {
      setIsLoading(false)
      setTopics(res.data.topics)
    })
}

const getCommentsByArticle = (article_id, setThisArticleComments, setErrState,pageNumber) => {
  return axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}/comments?p=${pageNumber}`)
    .then(res => {
      setThisArticleComments(res.data.comments)
    })
    .catch(err => setErrState(true))
}

const postComment = (article_id, loggedInUser, commentInput, setThisArticleComments, setCommentFeedback, setCommentPending) => {
  axios.post(`https://news-api-p73k.onrender.com/api/articles/${article_id}/comments`, { username: loggedInUser, body: commentInput })
    .then(res => {
      setThisArticleComments((curr) => [res.data.comment, ...curr])
      setCommentFeedback('Comment Posted successfully!')
      setCommentPending(false)
      setTimeout(() => setCommentFeedback(''), 2000)
    })
    .catch(err => {
      setCommentPending(false)
      alert('Something went wrong posting your comment...')
    })
}

const getArticles = (setArticles, setIsLoading, slug, sortBy, queryOrder,pageNumber,setNotFound) => {
  let queryString = 'https://news-api-p73k.onrender.com/api/articles'
  queryString += `?sort_by=${sortBy}&order=${queryOrder}&p=${pageNumber}`
  if (slug) queryString += `&topic=${slug}`
  axios.get(queryString)
    .then(res => {
      setArticles(res.data.articles)
      setIsLoading(false)
    }).catch(()=>setNotFound(true))
}

const getSingleArticle = (setArticles, setIsLoading, article_id, setNotFound) => {
  axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}`)
    .then(res => {
      if (article_id) setArticles([res.data.article])
      else setArticles(res.data.articles)
      setIsLoading(false)
    }).catch(()=>setNotFound(true))
}

const getArticlesByUsername=(loggedInUser,setUserArticles, pageNumber)=>{
  axios.get(`https://news-api-p73k.onrender.com/api/users/${loggedInUser}/articles?limit=10&p=${pageNumber}`)
    .then(res=>setUserArticles(res.data.articles))
}

const getCommentsByUsername=(loggedInUser,setUserComments, pageNumber)=>{
  axios.get(`https://news-api-p73k.onrender.com/api/users/${loggedInUser}/comments?limit=10&p=${pageNumber}`)
    .then(res=>setUserComments(res.data.comments))
}

const upDownVoteArticle = (increment, article) => {
  return axios.patch(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`, { inc_votes: increment })
    .catch(err => {
      alert('Something went wrong processing your vote...')
      return err
    })
}

const upDownVoteComment = (increment, comment) => {
  return axios.patch(`https://news-api-p73k.onrender.com/api/comments/${comment.comment_id}`, { inc_votes: increment })
    .catch(err => {
      alert('Something went wrong processing your vote...')
      return err
    })
}

const getUsers = () => {
  return axios.get('https://news-api-p73k.onrender.com/api/users')
    .then((res) => res.data.users)
}

const getUserByName=(loggedInUser,setCurrUser)=>{
  return axios.get(`https://news-api-p73k.onrender.com/api/users/${loggedInUser}`)
    .then(res=>setCurrUser(res.data.user))
}

const deleteComment = (comment) => {
  return axios.delete(`https://news-api-p73k.onrender.com/api/comments/${comment.comment_id}`)
}

const postArticle = (setPosted,setPostPending,articleObject)=>{
  return axios.post('https://news-api-p73k.onrender.com/api/articles',articleObject)
    .then(()=>{
      setPosted(true)
      setPostPending(false)
      setTimeout(()=>setposted(false),3000)
    })
}

const deleteArticle = (article)=>{
  return axios.delete(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`)
}

export { getTopics, getCommentsByArticle, postComment, getArticles, getSingleArticle, getArticlesByUsername, getCommentsByUsername, upDownVoteArticle, upDownVoteComment, getUsers, getUserByName, deleteComment, postArticle, deleteArticle }
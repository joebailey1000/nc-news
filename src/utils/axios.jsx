import axios from "axios"

const getTopics = (setIsLoading, setTopics) => {
    return axios.get('https://news-api-p73k.onrender.com/api/topics')
        .then(res => {
            setIsLoading(false)
            setTopics(res.data.topics)
        })
}

const getCommentsByArticle = (article_id, setThisArticleComments, setIsLoading, setErrState) => {
    axios.get(`https://news-api-p73k.onrender.com/api/articles/${article_id}/comments`)
        .then(res => {
            setThisArticleComments(res.data.comments)
            setIsLoading(false)
        })
        .catch(err => setErrState(err))
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

const getArticles = (setArticles, setIsLoading, article_id, slug) => {
    let queryString = 'https://news-api-p73k.onrender.com/api/articles'
    if (article_id) queryString += `/${article_id}`
    if (slug) queryString += `?topic=${slug}`
    axios.get(queryString)
        .then(res => {
            console.log(res)
            if (article_id) setArticles([res.data.article])
            else setArticles(res.data.articles)
            setIsLoading(false)
        })
}

const upDownVote = (increment,article,votes,setVotes) =>{
    setVotes(votes + increment)
        return axios.patch(`https://news-api-p73k.onrender.com/api/articles/${article.article_id}`, { inc_votes: increment })
            .catch(err => {
                setVotes(votes)
                alert('Something went wrong processing your vote...')
                return err
            })
}

export { getTopics, getCommentsByArticle, postComment, getArticles,upDownVote }
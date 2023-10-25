import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArticleCards } from './ArticleCards'
import { CommentCards } from './CommentCards'
import { ColorRing } from 'react-loader-spinner'
import { getCommentsByArticle, postComment } from './utils/axios'
import { PageSwitcher } from './PageSwitcher'

export const SingleArticle = ({ loggedInUser }) => {
  const [thisArticleComments, setThisArticleComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errState, setErrState] = useState(false)
  const { article_id } = useParams()
  const [commentPending, setCommentPending] = useState(false)
  const [commentFeedback, setCommentFeedback] = useState('')
  const [pageNumber,setPageNumber]=useState(1)
  const [commentInput, setCommentInput] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getCommentsByArticle(article_id, setThisArticleComments, setIsLoading, setErrState,pageNumber)
  }, [article_id,pageNumber])

  return errState ? (
    <p>There doesn't seem to be anything here...</p>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <ArticleCards article_id={article_id} showBody={true} />
      {loggedInUser ? (<form className='parent' onSubmit={(e) => {
        e.preventDefault()
        if (commentInput) {
          setCommentPending(true)
          postComment(article_id, loggedInUser, commentInput, setThisArticleComments, setCommentFeedback, setCommentPending)
        } else {
          setCommentFeedback('Please enter a comment.')
          setTimeout(() => setCommentFeedback(''), 2000)
        }
        setCommentInput('')
        document.getElementById('comment-input').value = ''
      }}>
        <label id='comment-input-label' htmlFor='comment-input'>Post a comment:</label>
        <div>
          <textarea id='comment-input' onChange={(e) => {
            setCommentInput(e.target.value)
          }}></textarea>
        </div>
        <div className='flex-div'>
          <p id='feedback'>{commentFeedback}</p>
          {commentPending ? (<ColorRing
            visible={true}
            height="20"
            width="20"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#ff0800', '#ff0800', '#ff0800', '#ff0800', '#ff0800']}
          />) : (<button type='submit'>{'>'}</button>)}
        </div>
      </form>) : ''}
      <div className='parent'>
        {thisArticleComments.map((comment, index) => {
          return (
            <CommentCards loggedInUser={loggedInUser} comment={comment} index={index} comments={thisArticleComments} setThisArticleComments={setThisArticleComments} />
          )
        })}
        <PageSwitcher pageNumber={pageNumber} setPageNumber={setPageNumber} pageLength={thisArticleComments.length}/>
      </div>

    </>
  )
}
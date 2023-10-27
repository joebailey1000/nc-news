import { VoteButtons } from "./VoteButtons"
import { upDownVoteComment, deleteComment } from "./utils/axios"
import { useState } from "react"
import { ColorRing } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

export const CommentCards = ({ comments, comment, loggedInUser, setThisArticleComments }) => {
  const [deletePending, setDeletePending] = useState(false)
  const navigate=useNavigate()

  return (
    <article key={comment.comment_id} className='article-card'>
      <section className="flex-div">
        <p className="usr-msg">{comment.body}</p>
          <VoteButtons upDownVote={upDownVoteComment} article={comment} />
      </section>
      <section className="flex-div">
      <button className='user-button' onClick={()=>navigate(`/users/${comment.author}`)}><p className="de-emphasise usr-msg">{comment.author}</p></button>
        
        <p className="de-emphasise">{comment.created_at.slice(0, 10)}</p>
          {loggedInUser === comment.author ? deletePending ? (<ColorRing
            className='delete-spinner'
            visible={true}
            height="20"
            width="20"
            ariaLabel="blocks-loading"
            wrapperStyle={{'margin-top':'19px'}}
            wrapperClass="blocks-wrapper"
            colors={['#ff0800', '#ff0800', '#ff0800', '#ff0800', '#ff0800']}
          />) : (<button onClick={() => {
            if (confirm('Delete this comment?')) {
              setDeletePending(true)
              deleteComment(comment)
                .then(() => {
                  setDeletePending(false)
                  alert('Comment deleted successfully.')
                  setThisArticleComments(comments.filter(c => c.comment_id !== comment.comment_id))
                }).catch(err=>alert('Something went wrong deleting your comment...'))
              
            }
          }} className='delete-comment'>x</button>) : ''}
      </section>
    </article>
  )

}
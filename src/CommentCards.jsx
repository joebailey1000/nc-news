import { VoteButtons } from "./VoteButtons"
import { upDownVoteComment } from "./utils/axios"
import { deleteComment } from "./utils/axios"

export const CommentCards = ({ comments,loggedInUser, setThisArticleComments }) => {
    return (
        <div className="parent">
            {comments.map((comment, index) => {
                return (
                    <div key={comment.comment_id} className={index === comments.length - 1 ? '' : 'article-card'}>
                        <div className="flex-div">
                            <p>{comment.body}</p>
                            <div className="vertical-div">
                                <VoteButtons upDownVote={upDownVoteComment} article={comment} />

                            </div>
                        </div>
                        <div className="flex-div">
                            <p className="de-emphasise">{comment.author}</p>
                            <p className="de-emphasise">{comment.created_at.slice(0, 10)}</p>
                            <div>
                            {loggedInUser===comment.author?(<button onClick={()=>{
                                if (confirm('Delete this comment?')){
                                    deleteComment(comment)
                                        .then(()=>alert('Comment deleted successfully.'))
                                    setThisArticleComments(comments.filter(c=>c.comment_id!==comment.comment_id))
                                }
                            }} className='delete-comment'>x</button>):''}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
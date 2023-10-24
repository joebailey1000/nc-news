import { VoteButtons } from "./VoteButtons"
import { upDownVoteComment } from "./utils/axios"

export const CommentCards = ({ comments }) => {
    return (
        <div className="parent">
            {comments.map((comment, index) => {
                return (
                    <div key={comment.comment_id} className={index===comments.length-1?'':'article-card'}>
                        <div className="flex-div">
                            <p>{comment.body}</p>
                            <div className="vertical-div">
                                <VoteButtons upDownVote={upDownVoteComment} article={comment}/>

                            </div>
                        </div>
                        <div className="flex-div">
                        <p className="de-emphasise">{comment.author}</p>
                                <p className="de-emphasise">{comment.created_at.slice(0, 10)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
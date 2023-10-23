export const CommentCards = ({ comments }) => {
    return (
        <div className="parent">
            {comments.map(comment => {
                return (
                    <div key={comment.comment_id} className="article-card">
                        <div className="flex-div">
                            <p>{comment.body}</p>
                            <div className="vertical-div">
                                <button className="vote-button-up">{'>'}</button>
                                <p className="vote-count">{comment.votes}</p>
                                <button className="vote-button-down">{'<'}</button>
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
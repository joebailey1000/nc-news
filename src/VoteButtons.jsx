import { useState } from "react"

export const VoteButtons = ({article,upDownVote}) => {
    const [votes, setVotes] = useState(0)
    const [hasVoted, setHasVoted] = useState(false)
    return (
        <div className="vertical-div">
            <button className="vote-button-up" id={`up${article.comment_id||article.article_id}`} onClick={(e) => {
                e.preventDefault()
                const button = document.getElementById(`up${article.comment_id||article.article_id}`)
                switch (hasVoted) {
                    case 'up':
                        button.style = ''
                        setHasVoted(false)
                        setVotes(0)
                        upDownVote(-1, article)
                        break
                    case 'down':
                        button.style = 'background-color:red'
                        document.getElementById(`down${article.comment_id||article.article_id}`).style = ''
                        setHasVoted('up')
                        setVotes(1)
                        upDownVote(2, article)
                        break
                    case false:
                        button.style = 'background-color:red'
                        setHasVoted('up')
                        setVotes(1)
                        upDownVote(1, article)
                }
            }}>{'>'}</button>
            <p className="vote-count">{article.votes+votes}</p>
            <button className="vote-button-down" id={`down${article.comment_id||article.article_id}`} onClick={(e) => {
                e.preventDefault()
                const button = document.getElementById(`down${article.comment_id||article.article_id}`)
                switch (hasVoted) {
                    case 'up':
                        button.style = 'background-color:blue'
                        document.getElementById(`up${article.comment_id||article.article_id}`).style = ''
                        setHasVoted('down')
                        setVotes(-1)
                        upDownVote(-2, article)
                        break
                    case 'down':
                        button.style = ''
                        setHasVoted(false)
                        setVotes(0)
                        upDownVote(1, article)
                        break
                    case false:
                        button.style = 'background-color:blue'
                        setHasVoted('down')
                        setVotes(-1)
                        upDownVote(-1, article)
                }
            }}>{'<'}</button>
        </div>
    )
}
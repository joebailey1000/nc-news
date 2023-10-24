import { useState } from "react"
import { upDownVote } from "./utils/axios"

export const VoteButtons = ({article}) => {
    const [votes, setVotes] = useState(article.votes)
    const [hasVoted, setHasVoted] = useState(false)
    return (
        <div className="vertical-div">
            <button className="vote-button-up" id={`up${article.article_id}`} onClick={(e) => {
                e.preventDefault()
                const button = document.getElementById(`up${article.article_id}`)
                switch (hasVoted) {
                    case 'up':
                        button.style = ''
                        setHasVoted(false)
                        upDownVote(-1, article, votes, setVotes)
                        break
                    case 'down':
                        button.style = 'background-color:red'
                        document.getElementById(`down${article.article_id}`).style = ''
                        setHasVoted('up')
                        upDownVote(2, article, votes, setVotes)
                        break
                    case false:
                        button.style = 'background-color:red'
                        setHasVoted('up')
                        upDownVote(1, article, votes, setVotes)
                }
            }}>{'>'}</button>
            <p className="vote-count">{votes}</p>
            <button className="vote-button-down" id={`down${article.article_id}`} onClick={(e) => {
                e.preventDefault()
                const button = document.getElementById(`down${article.article_id}`)
                switch (hasVoted) {
                    case 'up':
                        button.style = 'background-color:blue'
                        document.getElementById(`up${article.article_id}`).style = ''
                        setHasVoted('down')
                        upDownVote(-2, article, votes, setVotes)
                        break
                    case 'down':
                        button.style = ''
                        setHasVoted(false)
                        upDownVote(1, article, votes, setVotes)
                        break
                    case false:
                        button.style = 'background-color:blue'
                        setHasVoted('down')
                        upDownVote(-1, article, votes, setVotes)
                }
            }}>{'<'}</button>
        </div>
    )
}
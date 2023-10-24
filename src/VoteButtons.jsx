import { useState } from "react"

export const VoteButtons = ({article,upDownVote}) => {
    const [votes, setVotes] = useState(article.votes)
    const [hasVoted, setHasVoted] = useState(false)
    return (
        <div className="vertical-div">
            <button className="vote-button-up" id={`up${article.body}`} onClick={(e) => {
                e.preventDefault()
                const button = document.getElementById(`up${article.body}`)
                switch (hasVoted) {
                    case 'up':
                        button.style = ''
                        setHasVoted(false)
                        upDownVote(-1, article, votes, setVotes)
                        break
                    case 'down':
                        button.style = 'background-color:red'
                        document.getElementById(`down${article.body}`).style = ''
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
            <button className="vote-button-down" id={`down${article.body}`} onClick={(e) => {
                e.preventDefault()
                const button = document.getElementById(`down${article.body}`)
                switch (hasVoted) {
                    case 'up':
                        button.style = 'background-color:blue'
                        document.getElementById(`up${article.body}`).style = ''
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
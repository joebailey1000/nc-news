import comment from './assets/comment.png'
import { VoteButtons } from "./VoteButtons"
import { upDownVoteArticle } from "./utils/axios"
import { useNavigate } from 'react-router-dom'

export const ArticleCard = ({ article, showBody}) => {
const navigate=useNavigate()

  return (
    <div key={article.article_id} className='article-card'>
      <div className="vertical-div">
        <div className="flex-div">
          <button className='article-header-button' onClick={()=>navigate(`/articles/${article.article_id}`)}><h4>{article.title}</h4></button>
          <div className='flex-div'>
          {showBody?'':<img className='preview-img' src={article.article_img_url}/>}
          <VoteButtons upDownVote={upDownVoteArticle} article={article} />
          </div>
        </div>
        {showBody ? (
          <>
            <img className='article-img' src={article.article_img_url} />
            <p>{article.body}</p>
          </>
        ) : ''}
        <div className="flex-div">
          <button className='user-button' onClick={()=>navigate(`/users/${article.author}`)}><p className="de-emphasise">{article.author}</p></button>
          <p className="de-emphasise">{article.created_at.slice(0, 10)}</p>
          <div className="comment-div">
            <img className='comment-icon' src={comment} />
            <p className="comment-count">{article.comment_count}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
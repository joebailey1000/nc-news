import { Link } from "react-router-dom"
import comment from './assets/comment.png'
import { VoteButtons } from "./VoteButtons"

export const ArticleCard = ({ articles, article, showBody, index }) => {
    return (
        <div key={article.article_id} className={index === articles.length - 1 ? '' : 'article-card'}>
            <div className="vertical-div">
                <div className="flex-div">
                    <h4><Link to={`/articles/${article.article_id}`} >{article.title}</Link></h4>
                    <VoteButtons article={article}/>
                </div>
                {showBody ? (
                    <>
                        <img className='article-img' src={article.article_img_url} />
                        <p>{article.body}</p>
                    </>
                ) : ''}
                <div className="flex-div">
                    <p className="de-emphasise">{article.author}</p>
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
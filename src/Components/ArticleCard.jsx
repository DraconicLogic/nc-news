import React from 'react';
import {Link} from 'react-router-dom'
import ModVote from './ModVote.jsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const ArticleCard = ({article}) => {
  return (
    <div className="cards" >
      <header className="card-title">
        <Link to={`/articles/${article._id}`}>
          <h3 className='article-title'>{article.title}</h3>
        </Link>
        <p className="slug">Topic : {article.belongs_to}</p>
        <p className="date">Posted : {dayjs().to(dayjs(article.created_at))}</p>
      </header>
      <ModVote className="card-vote" id={article._id} votes={article.votes} url="articles"/>
      <div className="card-body">{article.body}</div>
      <Link to={`/articles/${article._id}`}>
        <p className="card-readmore">Read More...</p>
      </Link>
      {/* <div className="card-comment-count">
      💬
      </div> */}
    </div>
  );
};

export default ArticleCard;
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import htmlSubstring from '../../services/htmlSubstring'
import injectEllipsis from '../../services/injectEllipsis'

import UserCard from '../UserCard/UserCard.component';
import TagBadge from '../TagBadge/TagBadge.component';

import './PostItem.styles.scss';

// {
//   "tags": [
//       "sprite-kit",
//       "skscene"
//   ],
//   "owner": {
//       "account_id": 21984,
//       "reputation": 16695,
//       "user_id": 53870,
//       "user_type": "registered",
//       "accept_rate": 81,
//       "profile_image": "https://www.gravatar.com/avatar/e9bcdc2623fe00b172817ed2fc9c8c11?s=128&d=identicon&r=PG",
//       "display_name": "Andy Dent",
//       "link": "https://stackoverflow.com/users/53870/andy-dent"
//   },
//   "is_answered": false,
//   "view_count": 53,
//   "bounty_amount": 500,
//   "bounty_closes_date": 1632465724,
//   "answer_count": 0,
//   "score": 2,
//   "last_activity_date": 1632463050,
//   "creation_date": 1631372546,
//   "last_edit_date": 1632463050,
//   "question_id": 69144153,
//   "content_license": "CC BY-SA 4.0",
//   "link": "https://stackoverflow.com/questions/69144153/skview-presentscene-with-transition-not-working-if-have-shown-another-skview",
//   "title": "SKView.presentScene with transition not working if have shown another SKView"
// }

const PostItem = ({
  post: {
    id,
    title,
    body,
    tagname,
    username,
    user_id,
    answer_count,
    comment_count,
    views,
    created_at,
  },
}) => {
  const answerVoteUp = (
    <div className='vote answer'>
      <span className='vote-count fc-green-500'>{answer_count}</span>
      <div className='count-text'>answers</div>
    </div>
  );

  const answerVoteDown = (
    <div className='vote'>
      <span className='vote-count'>{answer_count}</span>
      <div className='count-text'>answers</div>
    </div>
  );

  return (
    <div className='posts'>
      <div className='stats-container fc-black-500'>
        <div className='stats'>
          <div className='vote'>
            <span className='vote-count'>{comment_count}</span>
            <div className='count-text'>comments</div>
          </div>
          {answer_count > 0 ? answerVoteUp : answerVoteDown}
          <div className='vote'>
            <span className='vote-count'>{tagname ? 1 : 0}</span>
            <div className='count-text'>tags</div>
          </div>
          <div className='vote'>
            <div className='count-text'>{views} views</div>
          </div>
        </div>
      </div>
      <div className='summary'>
        <h3>
          <Link to={`/questions/${id}`}>{title}</Link>
        </h3>
        {/* <div className='brief' dangerouslySetInnerHTML={{__html: injectEllipsis(htmlSubstring(body, 200))}}></div> */}
        <TagBadge tag_name={tagname} size={'s-tag'} float={'left'} />
        <UserCard
          created_at={created_at}
          user_id={user_id}
          username={username}
          float={'right'}
          backgroundColor={'transparent'}
        />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);

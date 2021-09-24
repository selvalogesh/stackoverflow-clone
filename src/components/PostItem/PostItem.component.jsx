import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import UserCard from '../UserCard/UserCard.component';
import TagBadge from '../TagBadge/TagBadge.component';

import './PostItem.styles.scss';

const PostItem = ({
  post: {
    question_id,
    title,
    tags,
    owner:{display_name,user_id},
    answer_count,
    view_count,
    created_date,
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
          {answer_count > 0 ? answerVoteUp : answerVoteDown}
          <div className='vote'>
            <span className='vote-count'>{tags.length}</span>
            <div className='count-text'>tags</div>
          </div>
          <div className='vote'>
            <div className='count-text'>{view_count} views</div>
          </div>
        </div>
      </div>
      <div className='summary'>
        <h3>
          <Link to={`/questions/${question_id}`}>{title}</Link>
        </h3>
        {tags.map((tag, index)=><TagBadge key={index} tag_name={tag} size={'s-tag ml-1'} link={'https://stackoverflow.com/questions/tagged/'+tag} href={true} float={'left'} />)}
        <UserCard
          created_at={created_date}
          user_id={user_id}
          username={display_name}
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
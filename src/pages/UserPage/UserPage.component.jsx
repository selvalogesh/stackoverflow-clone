import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../redux/users/users.actions';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/LogoGlyphMd.svg';

import PageTitle from '../../components/PageTitle/PageTitle.component';
import Spinner from '../../components/Spinner/Spinner.component';
import PostItem from '../../components/PostItem/PostItem.component';
import TagBadge from '../../components/TagBadge/TagBadge.component';

import './UserPage.styles.scss';

const UserPage = ({ getUser, user: { user, loading }, match }) => {
  useEffect(() => {
    getUser(match.params.id);
    // eslint-disable-next-line
  }, [getUser]);

  console.log(user)

  return loading || user === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <PageTitle title={`User ${user.display_name} - CLONE Stack Overflow`} />
      <div id='mainbar' className='user-main-bar pl24 pt24'>
        <div className='user-card'>
          <div className='grid--cell s-navigation mb16'>
            <Link
              to='#'
              className='s-navigation--item is-selected'
              data-shortcut='P'
            >
              Profile
            </Link>
            <Link to='#' className='s-navigation--item' data-shortcut='A'>
              Activity
            </Link>
          </div>
          <div className='grid'>
            <div className='img-card'>
              <div className='avatar-card'>
                <div className='avatar'>
                  <a href={user.link} className='avatar-link'>
                    <div className='logo-wrapper'>
                      <img
                        src={user.profile_image}
                        alt='user-logo'
                      />
                    </div>
                  </a>
                </div>
                <div className='title'>
                  <div className='grid fc-black-800'>
                    {user.views}
                    &nbsp;
                    <span className='fc-light'>PROFILE VIEWS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='content-card'>
              <div className='content-grid'>
                <div className='info-cell'>
                  <div className='info'>
                    <div className='details'>
                      <h2>{user.display_name}</h2>
                    </div>
                    <div className='date'>
                      <p>
                        Reputation:&nbsp;{user.reputation}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='stats-cell'>
                  <div className='count-sec'>
                    <div className='counts'>
                      <div className='cells'>
                        <div className='column-grid'>
                          <div className='head fc-black-700'>
                            {user.questions.length}
                          </div>
                          <div className='foot fc-black-500'>questions</div>
                        </div>
                      </div>
                      <div className='cells'>
                        <div className='column-grid'>
                          <div className='head fc-black-700'>
                            {user.tags.length}
                          </div>
                          <div className='foot fc-black-500'>tags</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row-grid'>
          <div className='grid-cell1'>
            <div className='cell-layout'>
              <div className='community'>
                <h3 className='bc-black-3'>
                  <span className='icon'>
                    <svg
                      aria-hidden='true'
                      className='svg-icon native icon-logo-sex'
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                    >
                      <path
                        d='M3 4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2H3z'
                        fill='#8FD8F7'
                      />
                      <path
                        d='M15 11H3c0 1.1.9 2 2 2h5v3l3-3a2 2 0 0 0 2-2z'
                        fill='#155397'
                      />
                      <path fill='#46A2D9' d='M3 5h12v2H3z' />
                      <path fill='#2D6DB5' d='M3 8h12v2H3z' />
                    </svg>
                  </span>
                  <span className='text fw-bold fc-dark bc-black-3'>
                    Communities
                  </span>
                </h3>
                <ul>
                  <li className='item'>
                    <Link to='/'>
                      <span>
                        <Logo className='logo' />
                      </span>
                      <span className='fc-blue-600 fs-body2'>
                        Stack Overflow
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='user-posts'>
                <h3 className='fw-bold fc-dark bc-black-3'>
                  Top network posts
                </h3>
                <p className='fc-light'>
                  We respect a laser-like focus on one topic.
                </p>
              </div>
            </div>
          </div>
          <div className='grid-cell2'>
            <div className='top-tags'>
              <h3 className='fw-bold fc-dark bc-black-3'>Top Tags</h3>
              <p className='fc-light'>
                {user.tags.length !== 0 && user.tags.map((tag, index) => <TagBadge key={index} tag_name={tag.name} size={'s-tag m-1'} link={'https://stackoverflow.com/questions/tagged/'+tag.name} href={true} float={'left'} />)}
              </p>
            </div>
            <br /><br /><br /><br />
            <div className='top-tags'>
              <h3 className='fw-bold fc-dark bc-black-3'>Featured questions</h3>
              <p className='fc-light'>
                <div className='questions'>
                  {user.questions.map((question, index) => (
                    <PostItem key={index} post={question} />
                  ))}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

UserPage.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.loading,
});

export default connect(mapStateToProps, { getUser })(UserPage);

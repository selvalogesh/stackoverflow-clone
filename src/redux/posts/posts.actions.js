import axios from 'axios';
import {setAlert} from '../alert/alert.actions';
import {
  GET_POSTS,
  GET_TOP_POSTS,
  POST_ERROR,
} from './posts.types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('https://api.stackexchange.com/2.3/questions/featured?site=stackoverflow');

    dispatch({
      type: GET_POSTS,
      payload: res.data.items,
    });
  } catch (err) {
    console.log(err.response)
    dispatch(setAlert(err.response.data.error_message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.data.error_message, status: err.response.status},
    });
  }
};

//GET TOP POSTS
export const getTopPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('https://api.stackexchange.com/2.3/questions/featured?pagesize=10&site=stackoverflow');

    dispatch({
      type: GET_TOP_POSTS,
      payload: res.data.items,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error_message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.data.error_message, status: err.response.status},
    });
  }
};
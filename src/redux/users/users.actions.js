import { GET_USER, USER_ERROR} from './users.types';

import axios from 'axios';

// Get user
export const getUser = (id) => async (dispatch) => {
  try {
    const user = axios.get(`https://api.stackexchange.com/2.3/users/${id}?site=stackoverflow`);
    const tags = axios.get(`https://api.stackexchange.com/2.3/users/${id}/tags?site=stackoverflow`);
    const questions = axios.get(`https://api.stackexchange.com/2.3/users/${id}/questions?site=stackoverflow`);
    const res = await Promise.all([user, tags, questions]);
    
    const data = {...res[0].data.items[0], tags:res[1].data.items, questions:res[2].data.items }


    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

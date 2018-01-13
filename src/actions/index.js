import axios from 'axios';
import { FETCH_POSTS, DELETE_POST, CREATE_POST } from './types';

const ROOT_URL = 'http://localhost:64441/api/posts';

export const fetchPosts = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}`)
    .then(response => {
      dispatch({ type: FETCH_POSTS, payload: response.data });
    })
    .catch(error => {
      console.log(error);
    });
  }
}

  export const deletePost = (id) => {
    return (dispatch) => {
      axios.delete(`${ROOT_URL}/${id}`)
    //.then(() => callback());
    .then(response => {
      dispatch({ type: DELETE_POST, payload: response.data});
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const createPost = (values, callback) => {
  const request = axios.post(`${ROOT_URL}/`, values)
    .then(() => callback());

    return {
      type: CREATE_POST,
      payload: request
    }
}

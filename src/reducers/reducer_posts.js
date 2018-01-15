import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  allPosts: [],
  postDeleted: true,
}

export default (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST:
        return Object.assign({}, state, { postDeleted: true })
    case FETCH_POSTS:
      return { ...state, loading: false, allPosts: action.payload };
    default:
      return state;
  }
}

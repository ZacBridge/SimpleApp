import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  allPosts: []
}

export default (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POSTS:
      return { ...state, loading: false, allPosts: action.payload };
    default:
      return state;
  }
}

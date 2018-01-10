import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/types';

//Used to take an array of records, take 1 property out of each record and create a property out of that

const INITIAL_STATE = {
  loading: true,
  allPosts: []
}

export default (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POSTS:
      return { ...state, loading: false, allPosts: action.payload };
    default:
      return state;
  }
}

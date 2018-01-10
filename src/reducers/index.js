import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  loginReducer: loginReducer,
  postsReducer: PostsReducer,
  form: formReducer,
});

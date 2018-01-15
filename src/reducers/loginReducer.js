import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/loginAction';

const INITIAL_STATE = {
  authenticated: false
};

const loginReducer = (state = INITIAL_STATE, action) =>{
  switch (action.type){
    case LOGIN_SUCCESS:
     return Object.assign({}, state, { authenticated: true })
    case LOGIN_FAILURE:
      return Object.assign({}, state, { authenticated: false })
  default:
    return state;
  }
}

export default loginReducer;

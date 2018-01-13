import { LOGIN_SUCCESS } from '../actions/loginAction';

const INITIAL_STATE = {
  authenticated: false
};

const loginReducer = (state = INITIAL_STATE, action) =>{
  switch (action.type){
    case LOGIN_SUCCESS:

     return Object.assign({}, state, { authenticated: true })
  default:
    return state;
  }
}

export default loginReducer;

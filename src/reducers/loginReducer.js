import { LOGIN_SUCCESS } from '../actions/loginAction';

const INITIAL_STATE = {
  authenticated: false
};

const loginReducer = (state = INITIAL_STATE, action) =>{
  console.log('Login Reducer accessed');
  switch (action.type){
    case LOGIN_SUCCESS:
    //console.log('reducer: loginReducer')
    //console.log('payload value ' + action.payload)
    
     return Object.assign({}, state, { authenticated: true })
  default:
    return state;
  }
}

export default loginReducer;

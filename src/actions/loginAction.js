export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const userLogIn = (email) => {
  return {
    type: LOGIN_SUCCESS,
    payload: email
  }
}

export const userLogOut = () => {
  return {
    type: LOGIN_FAILURE
  }
}

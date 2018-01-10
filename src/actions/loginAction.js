export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const userLogIn = (email) => {
  return {
    type: LOGIN_SUCCESS,
    payload: email
  }
}

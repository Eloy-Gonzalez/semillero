import {REGISTER} from './users.actionsTypes'

const registerUser = (params = {}) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER,
      payload: params,
    })
  }
}

export { registerUser }
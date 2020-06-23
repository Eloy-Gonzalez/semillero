import {
  SEARCH_SAIME,
  SET_UBICATION,
  SET_ONE_USER,
  SET_FORM_STEP,
  REGISTER_NEW_USER
} from './users.actionsTypes'

const consultarSaime = (cedula) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_SAIME,
      keyword: cedula
    })
  }
}

const setUbication = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_UBICATION,
      payload
    })
  }
}

const setNewUser = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_ONE_USER,
      payload
    })
  }
}

const registerNewUser = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_NEW_USER,
      payload
    })
  }
}

const setFormStep = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_FORM_STEP,
      payload
    })
  }
}

// @Exports Functions
export {
  consultarSaime,
  setUbication,
  setNewUser,
  setFormStep,
  registerNewUser
}
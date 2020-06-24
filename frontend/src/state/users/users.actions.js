import {
  SEARCH_SAIME,
  SET_UBICATION,
  SET_ONE_USER,
  SET_PROFILES,
  SET_FORM_STEP,
  REGISTER_NEW_USER,

  // CLEANERS
  CLEAR_PROFILES,
  CLEAR_UBICATION,
  CLEAR_REPRESENTANTE
} from './users.actionsTypes'

const consultarSaime = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_SAIME,
      payload
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

const setFormStep = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_FORM_STEP,
      payload
    })
  }
}

const setProfiles = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROFILES,
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

// CLEANERS
const cleanProfiles = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PROFILES
    })
  }
}

const cleanUbication = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_UBICATION
    })
  }
}

const cleanRepresentante = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_REPRESENTANTE
    })
  }
}

// @Exports
export {
  // SETTERS
  setUbication,
  setNewUser,
  setFormStep,
  consultarSaime,
  registerNewUser,
  setProfiles,
  // ClEANERS
  cleanProfiles,
  cleanUbication,
  cleanRepresentante
}
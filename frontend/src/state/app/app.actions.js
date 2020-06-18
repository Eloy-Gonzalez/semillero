import {
  CLEAR_SERVER_ERRORS,
  MODAL_OPEN,
  MODAL_CLOSE,
  CLEAR_SERVER_SUCCESS
} from './app.actionTypes'

const clearServerErrors = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SERVER_ERRORS,
    })
  }
}

const clearServerSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SERVER_SUCCESS,
    })
  }
}

const openModal = (params = {}) => {
  return (dispatch) => {
    dispatch({
      type: MODAL_OPEN,
      payload: params,
    })
  }
}

const closeModal = () => {
  return (dispatch) => {
    dispatch({
      type: MODAL_CLOSE,
    })
  }
}


export {
  clearServerErrors,
  openModal,
  closeModal,
  clearServerSuccess
}

import {
  CLEAR_SERVER_ERRORS,
  MODAL_OPEN,
  MODAL_CLOSE,
  CLEAR_SERVER_SUCCESS,
  DIALOG_CONFIRM_OPEN,
  DIALOG_CONFIRM_CLOSE
} from './app.actionTypes'

// Server
const clearServerErrors = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SERVER_ERRORS
    })
  }
}

const clearServerSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SERVER_SUCCESS
    })
  }
}

// Modal
const openModal = (params = {}) => {
  return (dispatch) => {
    dispatch({
      type: MODAL_OPEN,
      payload: params
    })
  }
}

const closeModal = () => {
  return (dispatch) => {
    dispatch({
      type: MODAL_CLOSE
    })
  }
}

// DialogConfirm
const openDialogConfirm = (params) => {
  return (dispatch) => {
    dispatch({
      type: DIALOG_CONFIRM_OPEN,
      payload: params
    })
  }
}

const closeDialogConfirm = () => {
  return (dispatch) => {
    dispatch({
      type: DIALOG_CONFIRM_CLOSE
    })
  }
}

export {
  clearServerErrors,
  openModal,
  closeModal,
  clearServerSuccess,
  openDialogConfirm,
  closeDialogConfirm
}

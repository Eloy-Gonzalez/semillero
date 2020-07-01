import {SET_PROYECTS, GET_PROYECTS, REGITER_NEW_PROYECT, DELETE_PROYECT} from './proyects.actionsTypes'

const setProyects = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_PROYECTS,
      payload
    })
  }
}

const getProyects = () => {
  return (dispatch) => {
    dispatch({
      type: GET_PROYECTS,
    })
  }
}

const  createProyectAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: REGITER_NEW_PROYECT,
      payload
    })
  }
}

const  deleteProyectAction = (payload) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PROYECT,
      payload
    })
  }
}

export {getProyects, setProyects, createProyectAction, deleteProyectAction}
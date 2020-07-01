import {SET_PROYECTS, GET_PROYECTS, REGITER_NEW_PROYECT} from './proyects.actionsTypes'

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

const  deleteProyectAction = (id) => {
  return (dispatch) => {
    dispatch({
      type: REGITER_NEW_PROYECT,
      payload: id
    })
  }
}

export {getProyects, setProyects, createProyectAction}
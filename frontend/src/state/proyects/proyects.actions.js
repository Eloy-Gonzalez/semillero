import { SET_PROYECTS, GET_PROYECTS } from './proyects.actionsTypes'

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

export {getProyects, setProyects}
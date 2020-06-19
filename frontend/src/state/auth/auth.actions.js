import { LOGIN, LOGOUT, GET_AUTH } from './auth.actionsTypes';

const login = (params = {}) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: params,
    });
  };
};

const getAuth = () => {
  return (dispatch) => {
    dispatch({
      type: GET_AUTH,
    });
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
export { login, getAuth, logout };

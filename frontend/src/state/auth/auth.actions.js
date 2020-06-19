import { LOGIN, LOGOUT, CHECK_AUTH } from './auth.actionsTypes';

const login = (params = {}) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: params,
    });
  };
};

const checkAutentication = () => {
  return (dispatch) => {
    dispatch({
      type: CHECK_AUTH,
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

export { login, logout, checkAutentication };
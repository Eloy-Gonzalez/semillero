import { Map } from 'immutable';
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  USER_LOADED,
  CLEAR_LOGIN,
} from './auth.actionsTypes';

const initialState = Map().merge({
  token: localStorage.getItem('token'),
  loading: 0,
  user: {
    isAuthenticated: null,
    username: '',
    email: '',
  },
});

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_STARTED:
      return state.merge({
        loading: state.get('loading') + 1,
      });

    case REQUEST_FINISHED:
      return state.merge({
        loading: state.get('loading') - 1,
      });
    case REQUEST_FAILURE:
      return initialState.merge({
        loading: 0,
      });
    case USER_LOADED:
      return state.merge({
        user: payload,
      });
    case CLEAR_LOGIN:
      return state.merge({
        user: {
          isAuthenticated: null,
          username: '',
          email: '',
        },
      });

    default:
      return state;
  }
};
export default authReducer;

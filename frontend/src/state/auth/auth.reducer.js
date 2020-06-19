import { Map } from 'immutable';
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  SET_USER,
  LOGOUT,
} from './auth.actionsTypes';

const initialState = Map().merge({
  loading: 0,
  user: {
    isAuthenticated: false,
    username: ''
  },
});

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_STARTED:
      return state.merge({
        loading: state.get('loading') + 1
      });

    case REQUEST_FINISHED:
      return state.merge({
        loading: state.get('loading') - 1
      });

    case REQUEST_FAILURE:
      return initialState.merge({
        loading: 0,
      });
      
    case SET_USER:
      return state.merge({
        user: payload
      });

    case LOGOUT:
      return state.merge({
        user: {
          isAuthenticated: null,
          username: ''
        },
      });

    default:
      return state;
  }
};
export default authReducer;

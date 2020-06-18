import { Map } from 'immutable';
import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILURE,
  CLEAR_SERVER_ERRORS,
  MODAL_OPEN,
  MODAL_CLOSE,
  REQUEST_SUCCESS,
  CLEAR_SERVER_SUCCESS,
  SET_MENU,
} from './app.actionTypes';

const initialState = Map().merge({
  loading: false,
  serverErrors: null,
  statusError: null,
  serversuccess: null,
  menu: [],
  modal: {
    open: false,
    description: '',
  },
});

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_STARTED:
      return state.merge({
        loading: true,
      });

    case REQUEST_FINISHED:
      return state.merge({
        loading: false,
      });

    case REQUEST_FAILURE:
      return initialState.merge({
        loading: false,
        serverErrors: payload.serverErrors,
        statusError: payload.statusError,
      });

    case CLEAR_SERVER_ERRORS:
      return initialState.merge({
        serverErrors: null,
      });

    case REQUEST_SUCCESS:
      return state.merge({
        serversuccess: payload,
      });

    case CLEAR_SERVER_SUCCESS:
      return initialState.merge({
        serversuccess: false,
      });

    case MODAL_OPEN:
      return initialState.merge({
        modal: {
          open: true,
          description: payload,
        },
      });

    case MODAL_CLOSE:
      return state.merge({
        modal: {
          open: false,
          description: '',
        },
      });

    case SET_MENU:
      return state.merge({
        menu: payload,
      });

    default:
      return state;
  }
};

export default appReducer;

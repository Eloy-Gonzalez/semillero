import { combineReducers } from 'redux';

import appReducer from './app/app.reducer';
import authReducer from './auth/auth.reducer';

export default combineReducers({
  appReducer,
  authReducer  
});

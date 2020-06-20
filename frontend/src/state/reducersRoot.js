// @Vendors
import { combineReducers } from 'redux'

// @Reducers
import appReducer from './app/app.reducer'
import usersReducer from './users/users.reducer'

export default combineReducers({
  appReducer,
  usersReducer
});

// @Vendors
import { combineReducers } from 'redux'

// @Reducers
import appReducer from './app/app.reducer'
import usersReducer from './users/users.reducer'
import proyectsReducer from './proyects/proyects.reducer'
import periodosReducer from './periodos/periodos.reducer'

export default combineReducers({
  appReducer,
  usersReducer,
  proyectsReducer,
  periodosReducer
})

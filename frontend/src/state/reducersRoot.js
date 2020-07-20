// @Vendors
import { combineReducers } from 'redux'

// @Reducers
import appReducer from './app/app.reducer'
import usersReducer from './users/users.reducer'
import proyectsReducer from './proyects/proyects.reducer'
import periodosReducer from './periodos/periodos.reducer'
import fasesReducer from './fases/fases.reducer'
import categoriasReducer from './categorias/categorias.reducer'

/*** 
Admin Reducers
*/
import videosReducer from './admin/videos/videos.reducer'


export default combineReducers({
  appReducer,
  usersReducer,
  proyectsReducer,
  periodosReducer,
  fasesReducer,
  categoriasReducer,
  videosReducer
})

// @Vendors
import { all, fork } from 'redux-saga/effects'

// @Sagas
import auth from './auth/auth.sagas'
import users from './users/users.sagas'
import proyects from './proyects/proyects.sagas'
import periodos from './periodos/periodos.sagas'
import fases from './fases/fases.sagas'
import categorias from './categorias/categorias.sagas'

/**
  Admin Sagas
*/
import adminVideos from './admin/videos/videos.sagas'

export default function* () {
  yield all(
    [
      ...Object.values(auth),
      ...Object.values(users),
      ...Object.values(proyects),
      ...Object.values(periodos),
      ...Object.values(fases),
      ...Object.values(categorias),
      ...Object.values(adminVideos)
    ].map(fork)
  )
}

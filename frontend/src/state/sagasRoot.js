// @Vendors
import { all, fork } from 'redux-saga/effects'

// @Sagas
import auth from './auth/auth.sagas'
import users from './users/users.sagas'
import proyects from './proyects/proyects.sagas'
import periodos from './periodos/periodos.sagas'
import fases from './fases/fases.sagas'
import categorias from './categorias/categorias.sagas'
/** Admin Sagas **/
import videos from './admin/videos/videos.sagas'
import usuarios from './admin/usuarios/usuarios.sagas'

export default function*() {
  yield all([...Object.values(auth)].map(fork));
  yield all([...Object.values(users)].map(fork));
  yield all([...Object.values(proyects)].map(fork));
  yield all([...Object.values(periodos)].map(fork));
  yield all([...Object.values(fases)].map(fork));
  yield all([...Object.values(categorias)].map(fork));
  yield all([...Object.values(videos)].map(fork));
  yield all([...Object.values(usuarios)].map(fork));
}

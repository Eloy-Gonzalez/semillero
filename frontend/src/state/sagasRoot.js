// @Vendors
import { all, fork } from 'redux-saga/effects'

// @Sagas
import auth from './auth/auth.sagas'
import users from './users/users.sagas'
import proyects from './proyects/proyects.sagas'
import periodos from './periodos/periodos.sagas'

export default function* () {
  yield all(
    [
      ...Object.values(auth),
      ...Object.values(users),
      ...Object.values(proyects),
      ...Object.values(periodos)
    ].map(fork)
  )
}

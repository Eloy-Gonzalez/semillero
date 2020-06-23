// @Vendors
import { all, fork } from 'redux-saga/effects'

// @Sagas
import auth from './auth/auth.sagas'
import users from './users/users.sagas'

export default function* () {
  yield all(
    [
      ...Object.values(auth),
      ...Object.values(users)
    ].map(fork)
  )
}

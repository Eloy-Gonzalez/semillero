// @Vendors
import { all, fork } from 'redux-saga/effects'

// @Sagas
import app from './app/app.sagas'
import auth from './auth/auth.sagas'

export default function* () {
  yield all(
    [
      ...Object.values(app),
      ...Object.values(auth)
    ].map(fork)
  )
}

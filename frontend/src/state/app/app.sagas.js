// @vendors
import { put, takeLatest } from 'redux-saga/effects';

// @ActionsTypes
import {
    REQUEST_FAILURE
} from './app.actionTypes';

function* failureWorker({ payload }) {
    yield put({ type: REQUEST_FAILURE, payload });
}


// Whatcher
function* requestWatcher() {
    yield takeLatest(REQUEST_FAILURE, failureWorker);
}

export default { requestWatcher };
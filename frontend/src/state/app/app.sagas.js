// @vendors
import { put, takeLatest, call } from 'redux-saga/effects';

//Api
import { fetchMenu } from './app.api';

// @Utils
import { buildErrorsObj } from '../../utils/config';

// @ActionsTypes
import {
    REQUEST_FAILURE,
    GET_MENU,
    SET_MENU,
    REQUEST_STARTED,
    REQUEST_FINISHED,
} from './app.actionTypes';

/*
function* failureWorker({ payload }) {
    yield put({ type: REQUEST_FAILURE });
} */

function* getMenu() {
    try {
        yield put({ type: REQUEST_STARTED });

        const payload = yield call(fetchMenu);
        yield put({ type: SET_MENU, payload });

        yield put({ type: REQUEST_FINISHED });
    } catch (error) {
        yield put({
          type: REQUEST_FAILURE,
          payload: buildErrorsObj(error)
        });
    }
}

// Whatcher
function* requestWatcher() {
    // yield takeLatest(REQUEST_FAILURE, failureWorker);
    yield takeLatest(GET_MENU, getMenu);
}

export default { requestWatcher };
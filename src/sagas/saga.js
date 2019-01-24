import { takeEvery, call, put } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actionTypes from '../store/actions/actions';

function* workerSagaEmp(action) {
    const empData = yield call(api.fetchEmpData, action.payload);
    yield put({
        type: actionTypes.API_CALL_SAGA,
        payload: { newData: empData, isLoading: false, pages: empData.data.totalPages }
    })
}

function* workerSagaDep(action) {
    const depData = yield call(api.fetchDepData, action.payload);
    yield put({
        type: actionTypes.API_CALL_DEP_SAGA,
        payload: { newData: depData, isLoading: false, pages: depData.data.totalPages }
    })
}

function* workerSagaApp(action) {
    const userDetails = yield call(api.fetchUserDetails);
    yield put({
        type: actionTypes.FETCH_USERDETAILS,
        payload: { userDetails: userDetails, userId: action.payload }
    })
}

//watcher saga
function* rootSaga() {
    yield takeEvery('API_CALL', workerSagaEmp);
    yield takeEvery('API_CALL_DEP', workerSagaDep);
    yield takeEvery('SET_USER_DETAILS', workerSagaApp);
}

export default rootSaga;
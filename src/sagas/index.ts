import {takeLatest, takeEvery} from 'redux-saga/effects';
import {logIn, logOut, register} from './authenticationSaga';
import {types} from "../redux/actions/types";
import {
    createOperation,
    deleteOperation,
    getOperations,
    getRecentlyPosted,
    postOperations,
    updateOperation,
} from "./operationSaga";
import {
    getAccountBalance,
    getAccounts
} from "./accountSaga";
import {
    createGroup,
    deleteGroup,
    getGroups,
    updateGroup
} from "./groupSaga";
import {
    getTags
} from "./tagSaga";

function* mySaga() {
    yield takeLatest(types.LOG_OUT_REQUEST, logOut);
    yield takeLatest(types.AUTHENTICATION_REQUEST, logIn);
    yield takeLatest(types.REGISTRATION_REQUEST, register);
    yield takeLatest(types.GET_OPERATIONS_REQUEST, getOperations);
    yield takeLatest(types.GET_RECENTLY_POSTED_REQUEST, getRecentlyPosted);
    yield takeLatest(types.CREATE_OPERATION_REQUEST, createOperation);
    yield takeLatest(types.DELETE_OPERATION_REQUEST, deleteOperation);
    yield takeLatest(types.UPDATE_OPERATION_REQUEST, updateOperation);
    yield takeLatest(types.POST_OPERATIONS_REQUEST, postOperations);
    yield takeLatest(types.GET_ACCOUNTS_REQUEST, getAccounts);
    yield takeLatest(types.GET_GROUPS_REQUEST, getGroups);
    yield takeLatest(types.CREATE_GROUP_REQUEST, createGroup);
    yield takeLatest(types.DELETE_GROUP_REQUEST, deleteGroup);
    yield takeLatest(types.UPDATE_GROUP_REQUEST, updateGroup);
    yield takeLatest(types.GET_TAGS_REQUEST, getTags);
    yield takeEvery(types.GET_ACCOUNT_BALANCE_REQUEST, getAccountBalance)
}

export default mySaga;

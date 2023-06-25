import {
    CreateOperationAction,
    DeleteOperationAction,
    GetOperationsAction,
    PostOperationsAction,
    UpdateOperationAction
} from "../redux/actions/operationActions";
import {call, put} from 'redux-saga/effects';
import OperationApi from "../api/operation";
import {types} from "../redux/actions/types";

export function* getOperations(action: GetOperationsAction) {
    try {yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(OperationApi.getOperations);
        yield put({type: types.GET_OPERATIONS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_OPERATIONS_FAILURE, text: e.message});
    }
}

export function* createOperation(action: CreateOperationAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(OperationApi.createOperation, action.params);
        yield put({type: types.CREATE_OPERATION_SUCCESS, params: {...action.params, data}});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.CREATE_OPERATION_FAILURE, params: {...action.params, error: e.message}});
    }
}

export function* updateOperation(action: UpdateOperationAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(OperationApi.updateOperation, action.params);
        yield put({type: types.UPDATE_OPERATION_SUCCESS, params: {...action.params, data}});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.UPDATE_OPERATION_FAILURE, params: {...action.params, error: e.message}});
        yield put({type: types.GET_OPERATIONS_REQUEST});
    }
}

export function* deleteOperation(action: DeleteOperationAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(OperationApi.deleteOperation, action.params);
        yield put({type: types.DELETE_OPERATION_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.DELETE_OPERATION_FAILURE, text: e.message});
        yield put({type: types.GET_OPERATIONS_REQUEST});
    }
}

export function* postOperations(action: PostOperationsAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(OperationApi.postOperations, action.params);
        yield put({type: types.POST_OPERATIONS_SUCCESS, params: {...action.params, data}});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.POST_OPERATIONS_FAILURE, params: {...action.params, error: e.message}});
        yield put({type: types.GET_OPERATIONS_REQUEST});
    }
}

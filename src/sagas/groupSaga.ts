import {call, put} from "redux-saga/effects";
import {types} from "../redux/actions/types";
import {
    CreateGroupAction,
    UpdateGroupAction,
    DeleteGroupAction,
    GetGroupsAction,
} from "../redux/actions/groupActions";
import GroupApi from "../api/group";

export function* getGroups(action: GetGroupsAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(GroupApi.getGroups);
        yield put({type: types.GET_GROUPS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_GROUPS_FAILURE, text: e.message});
    }
}

export function* createGroup(action: CreateGroupAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(GroupApi.createGroup, action.params);
        yield put({type: types.CREATE_GROUP_SUCCESS, params: {...action.params}});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.CREATE_GROUP_FAILURE, params: {...action.params, error: e.message}});
    }
}

export function* updateGroup(action: UpdateGroupAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(GroupApi.updateGroup, action.params);
        yield put({type: types.UPDATE_GROUP_SUCCESS, params: {...action.params}});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.UPDATE_GROUP_FAILURE, params: {...action.params, error: e.message}});
    }
}

export function* deleteGroup(action: DeleteGroupAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(GroupApi.deleteGroup, action.params);
        yield put({type: types.DELETE_GROUP_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.DELETE_GROUP_FAILURE, text: e.message});
        yield put({type: types.GET_GROUPS_REQUEST});
    }
}

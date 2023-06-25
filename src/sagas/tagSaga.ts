import {call, put} from "redux-saga/effects";
import {types} from "../redux/actions/types";
import {CreateTagAction, DeleteTagAction, GetTagsAction} from "../redux/actions/tagActions";
import TagApi from "../api/tag";

export function* getTags(action: GetTagsAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(TagApi.getTags);
        yield put({type: types.GET_TAGS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_TAGS_FAILURE, text: e.message});
    }
}

export function* createTag(action: CreateTagAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(TagApi.createTag, action.params);
        yield put({type: types.CREATE_TAG_SUCCESS, params: data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.CREATE_TAG_FAILURE, params: e.message});
    }
}

export function* deleteTag(action: DeleteTagAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(TagApi.deleteTag, action.params);
        yield put({type: types.DELETE_TAG_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.DELETE_TAG_FAILURE, text: e.message});
        yield put({type: types.DELETE_GROUP_REQUEST});
    }
}

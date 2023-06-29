import {call, put} from "redux-saga/effects";
import {types} from "../redux/actions/types";
import {GetTagsAction} from "../redux/actions/tagActions";
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


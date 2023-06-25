import initialState from './initialState';
import {types} from "../actions/types";

function actionTypeEndsInSuccess(type: string) {
    return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action: any
): number {
    if (action.type === types.BEGIN_API_CALL) {
        return state + 1;
    } else if (
        action.type === types.API_CALL_ERROR ||
        actionTypeEndsInSuccess(action.type)
    ) {
        return state - 1;
    }
    return state;
}

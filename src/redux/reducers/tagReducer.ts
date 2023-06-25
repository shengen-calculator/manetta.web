import initialState from "./initialState";
import {types} from "../actions/types";

export default function tagReducer(state = initialState.tags, action: any): Array<string> {
    switch (action.type) {

        case types.GET_TAGS_SUCCESS:
            return action.data;

        case types.CREATE_TAG_SUCCESS:
            return [
                ...state,
                action.params
            ];

        case types.DELETE_TAG_REQUEST:
            return [
                ...state.filter(gr => gr === action.params)
            ];

        default:
            return state;
    }
}

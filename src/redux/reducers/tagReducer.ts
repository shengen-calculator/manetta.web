import initialState from "./initialState";
import {types} from "../actions/types";

export default function tagReducer(state = initialState.tags, action: any): Array<Array<string>> {
    switch (action.type) {

        case types.GET_TAGS_SUCCESS:
            return action.data;

        default:
            return state;
    }
}

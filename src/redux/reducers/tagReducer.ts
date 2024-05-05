import initialState from "./initialState";
import {types} from "../actions/types";
import {TagState} from "./types";

export default function tagReducer(state = initialState.tag, action: any): TagState {
    switch (action.type) {

        case types.GET_TAGS_REQUEST:
            return {
                ...state,
                status: "REQUESTED"
            }

        case types.GET_TAGS_SUCCESS:
            return {
                ...state,
                status: "DEFINED",
                items: action.data
            }

        case types.GET_TAGS_FAILURE:
            return {
                ...state,
                status: "NOT_DEFINED"
            }

        default:
            return state;
    }
}

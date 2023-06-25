import initialState from './initialState';
import {types} from "../actions/types";

export default function groupReducer(state = initialState.groups, action: any): Array<Group> {
    switch (action.type) {

        case types.GET_GROUPS_SUCCESS:
            return action.data;

        case types.CREATE_GROUP_SUCCESS:
            return [
                ...state,
                action.params
            ];

        case types.UPDATE_GROUP_REQUEST:
            return [
                ...state.filter(gr => gr.name !== action.params.name),
                action.params
            ];

        case types.DELETE_GROUP_REQUEST:
            return [
                ...state.filter(gr => gr.name !== action.params.name)
            ];

        default:
            return state;
    }
}

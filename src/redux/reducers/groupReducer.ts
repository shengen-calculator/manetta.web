import initialState from './initialState';
import {types} from "../actions/types";
import {GroupState} from "./types";

export default function groupReducer(state = initialState.group, action: any): GroupState {
    switch (action.type) {

        case types.GET_GROUPS_REQUEST:
            return {
                ...state,
                status: "REQUESTED"
            }

        case types.GET_GROUPS_SUCCESS:
            return {
                ...state,
                status: "DEFINED",
                items: action.data
            }

        case types.GET_GROUPS_FAILURE:
            return {
                ...state,
                status: "NOT_DEFINED"
            }

        case types.CREATE_GROUP_REQUEST:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.params
                ].sort((a,b) =>
                    (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            }

        case types.UPDATE_GROUP_REQUEST:
            return {
                ...state,
                items: [
                    ...state.items.filter(gr => gr.name !== action.params.name),
                    action.params
                ].sort((a,b) =>
                    (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            }

        case types.DELETE_GROUP_REQUEST:
            return {
                ...state,
                items: [
                    ...state.items.filter(gr => gr.name !== action.params.name)
                ]
            }

        default:
            return state;
    }
}

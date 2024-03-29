import initialState from './initialState';
import {MessageState} from "./types";
import {types} from "../actions/types";

export default function messageReducer(state = initialState.message, action: any): MessageState {
    switch (action.type) {

        case types.REGISTRATION_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.AUTHENTICATION_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.REGISTRATION_SUCCESS:
            return {
                ...state,
                type: 'success',
                text: 'Registration success.'
            };

        case types.GET_OPERATIONS_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.CREATE_OPERATION_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error
            };

        case types.UPDATE_OPERATION_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error
            };

        case types.GET_GROUPS_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.CREATE_GROUP_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error
            };

        case types.UPDATE_GROUP_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error
            };

        case types.DELETE_GROUP_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error
            };

        case types.POST_OPERATIONS_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error
            };

        case types.GET_ACCOUNT_BALANCE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error
            };

        case types.REPORT_PERIOD_EXCEEDED:
            return {
                ...state,
                type: 'error',
                text: `Report period exceeded. Maximum limit days is: ${action.params.daysLimit}`
            };

        case types.GENERATE_EXPENSES_REPORT_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.params.error ? action.params.error : "Generate report Error"
            };

        case types.REVERT_OPERATION_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        default:
            return state;
    }
}

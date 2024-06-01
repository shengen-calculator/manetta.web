import initialState from './initialState';
import {types} from "../actions/types";
import {OperationState} from "./types";
import ApiHelper from "../../util/ApiHelper";

export default function operationReducer(state = initialState.operation, action: any): OperationState {
    switch (action.type) {

        case types.GET_OPERATIONS_REQUEST:
            return {
                ...state,
                status: "REQUESTED"
            }

        case types.GET_OPERATIONS_SUCCESS:
            return {
                ...state,
                status: "DEFINED",
                items: [
                    ...action.data.map((op: Operation) => {
                        return {
                            ...op,
                            sum: op.sum / 100
                        }
                    })
                ]
            };

        case types.GET_OPERATIONS_FAILURE:
            return {
                ...state,
                status: "NOT_DEFINED"
            }

        case types.CREATE_OPERATION_REQUEST:
                return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...action.params,
                        date: new Date(action.params.date).getTime(),
                        created: action.params.created
                    }
                ]
            };

        case types.CREATE_OPERATION_SUCCESS:
        return {
                ...state,
                items: [
                    ...state.items.filter(it => it.created !== action.params.created),
                    {
                        ...action.params,
                        id: ApiHelper.getIdFromResult(action.params.data),
                        date: new Date(action.params.date).getTime()
                    }
                ]
            };

        case types.UPDATE_OPERATION_REQUEST:
                return {
                ...state,
                items: [
                    ...state.items.filter(it => it.id !== action.params.id),
                    {
                        ...action.params,
                        date: new Date(action.params.date).getTime(),
                        sum: action.params.sum / 100
                    }
                ]
            };

        case types.POST_OPERATIONS_REQUEST:
            return {
                ...state,
                items: [
                    ...state.items.filter(it => !action.params.ids.includes(it.id))
                ]
            };

        case types.DELETE_OPERATION_REQUEST:
            return {
                ...state,
                items: [
                    ... state.items.filter(it => Number(it.id) !== action.params.id)
                ]
            };

        default:
            return state;
    }
}

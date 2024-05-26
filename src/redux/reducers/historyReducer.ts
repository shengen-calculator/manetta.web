import initialState from './initialState';
import {types} from "../actions/types";
import {HistoryState} from "./types";

export default function historyReducer(state = initialState.history, action: any): HistoryState {
    switch (action.type) {

        case types.GET_RECENTLY_POSTED_REQUEST:
            return {
                ...state,
                status: "REQUESTED"
            }

        case types.GET_RECENTLY_POSTED_SUCCESS:
            return {
                ...state,
                items: [
                    ...state.cursor ? state.items : [],
                    ...action.data.entries.map((posted: PostedOperationResult) => {
                        return {
                            created: posted.created,
                            account: posted.account,
                            date: posted.date,
                            description: posted.description,
                            docNumber: posted.docNumber,
                            equivalent: posted.euro/100,
                            balance: posted.balance/100,
                            sum: posted.sum/100,
                            tags: posted.tags,
                            isReverted: posted.isReverted,
                            isRevertOperation: posted.isRevertOperation
                        }
                    })
                ],
                cursor: action.data.cursor
            };

        case types.POST_OPERATIONS_SUCCESS:
            return {
                ...state,
                status: "REQUESTED",
                items: [
                    ...action.params.data.map((posted: any) => {
                        return {
                            account: posted.account.name,
                            date: posted.date,
                            created: posted.created,
                            description: posted.description,
                            docNumber: posted.docNumber,
                            equivalent: posted.equivalent/100,
                            balance: posted.balance/100,
                            sum: posted.sum/100,
                            tags: posted.tags,
                            isReverted: posted.isReverted,
                            isRevertOperation: posted.isRevertOperation
                        }
                    }),
                    ...state.items
                ]
            }

        case types.GET_RECENTLY_POSTED_FAILURE:
            return {
                ...state,
                status: "NOT_DEFINED"
            }

        case types.REVERT_OPERATION_REQUEST:
            return {
                ...state
            };

        case types.REVERT_OPERATION_SUCCESS:
            return {
                ...state
            };

        case types.REVERT_OPERATION_FAILURE:
            return {
                ...state
            };

        default:
            return state;
    }
}

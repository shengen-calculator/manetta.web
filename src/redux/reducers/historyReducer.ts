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
                ...state,
                items: state.items.map(item => {
                    if(item.docNumber !== action.params.docNumber) {
                        return item;
                    }
                    return {
                        ...item,
                        isReverted: true
                    }
                })
            };

        case types.REVERT_OPERATION_SUCCESS:
            return {
                ...state,
                items: [
                    ...action.data.map((item: any) => {
                        return {
                            account: item.account.name,
                            date: item.date,
                            created: item.created,
                            description: item.description,
                            docNumber: item.docNumber,
                            equivalent: item.equivalent/100,
                            balance: item.balance/100,
                            sum: item.sum/100,
                            tags: item.tags,
                            isReverted: item.isReverted,
                            isRevertOperation: item.isRevertOperation
                        }
                    }),
                    ...state.items
                ]
            };

        case types.REVERT_OPERATION_FAILURE:
            return {
                ...state
            };

        default:
            return state;
    }
}

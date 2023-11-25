import initialState from './initialState';
import {types} from "../actions/types";
import {HistoryState} from "./types";

export default function historyReducer(state = initialState.history, action: any): HistoryState {
    switch (action.type) {

        case types.GET_RECENTLY_POSTED_SUCCESS:
            return {
                ...state,
                entries: [
                    ...state.entries,
                    ...action.data.entries.map((posted: PostedOperationResult) => {
                        return {
                            id: Number(posted.id),
                            account: posted.account,
                            date: posted.date,
                            description: posted.description,
                            docNumber: posted.docNumber,
                            equivalent: posted.euro/100,
                            balance: posted.balance/100,
                            sum: posted.sum/100,
                            tags: posted.tags
                        }
                    })
                ],
                cursor: action.data.cursor
            };

        default:
            return state;
    }
}

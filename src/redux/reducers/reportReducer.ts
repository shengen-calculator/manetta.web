import initialState from "./initialState";
import {types} from "../actions/types";

export default function reportReducer(state = initialState.report, action: any) {
    switch (action.type) {
        case types.GENERATE_EXPENSES_REPORT_SUCCESS:
            return {
                ...state,
                url: action.data.pop()
            };

        default:
            return state;
    }
}

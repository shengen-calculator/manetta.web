import initialState from "./initialState";
import {types} from "../actions/types";
import {RateState} from "./types";

export default function rateReducer(state = initialState.rate, action: any): RateState {
    switch (action.type) {

        case types.GET_CURRENCY_RATES_REQUEST:
            return {
                ...state,
                status: "REQUESTED",
                items: []
            };

        case types.GET_CURRENCY_RATES_SUCCESS:
            return {
                ...state,
                status: "DEFINED",
                items: action.data.map((rec: CurrencyRate) => {
                    return {
                        rate: rec["rate"],
                        date: rec["date"],
                        currency: rec["currency"]
                    }
                })
            }

        case types.CREATE_CURRENCY_RATE_REQUEST:
            return {
                ...state,
                items: [
                    ...state.items.filter(it => it.currency !== action.params.currency),
                    {
                        ...action.params, date: new Date().getTime()
                    }
                ]
            };

        default:
            return state;
    }
}

import initialState from "./initialState";
import {types} from "../actions/types";
import {RateState} from "./types";

export default function rateReducer(state = initialState.rate, action: any): RateState {
    switch (action.type) {

        case types.GET_CURRENCY_RATES_REQUEST:
            return {
                status: "REQUESTED",
                items: []
            };

        case types.GET_CURRENCY_RATES_SUCCESS:
            return {
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
                status: "REQUESTED",
                items: []
            };

        case types.CREATE_CURRENCY_RATE_SUCCESS:
            return {
                status: "NOT_DEFINED",
                items: []
            };
        default:
            return state;
    }
}

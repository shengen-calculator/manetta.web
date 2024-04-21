import initialState from "./initialState";
import {types} from "../actions/types";

export default function rateReducer(state = initialState.rates, action: any): Rates {
    switch (action.type) {

        case types.GET_CURRENCY_RATES_SUCCESS:
            return action.data.reduce((acc: Rates, c: CurrencyRate) => (
                acc[c.currency]= {
                    rate: c.rate,
                    date: c.date
                }, acc),{});

        case types.CREATE_CURRENCY_RATE_REQUEST:
            return {};

        default:
            return state;
    }
}

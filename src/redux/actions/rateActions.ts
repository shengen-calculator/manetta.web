import {types} from "./types";

export type GetRatesAction = {
    type: types.GET_CURRENCY_RATES_REQUEST
}

export type CreateRateAction = {
    type: types.CREATE_CURRENCY_RATE_REQUEST
    params: CreateRateParams
}

export function getRatesRequest(): GetRatesAction {
    return {type: types.GET_CURRENCY_RATES_REQUEST}
}

export function createRateRequest(params: CreateRateParams): CreateRateAction {
    return {type: types.CREATE_CURRENCY_RATE_REQUEST, params}
}

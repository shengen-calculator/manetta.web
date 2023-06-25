import {types} from "./types";

export type GetAccountsAction = {
    type: types.GET_ACCOUNTS_REQUEST
}

export type GetAccountBalanceAction = {
    type: types.GET_ACCOUNT_BALANCE_REQUEST
    params: GetAccountBalanceParams
}

export function getAccountsRequest(): GetAccountsAction {
    return {type: types.GET_ACCOUNTS_REQUEST}
}

export function getAccountBalanceRequest(params: GetAccountBalanceParams): GetAccountBalanceAction {
    return {type: types.GET_ACCOUNT_BALANCE_REQUEST, params}
}

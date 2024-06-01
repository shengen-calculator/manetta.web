import {call, put} from "redux-saga/effects";
import {types} from "../redux/actions/types";
import {GetAccountBalanceAction, GetAccountsAction} from "../redux/actions/accountActions";
import AccountApi from "../api/account";

export function* getAccounts(action: GetAccountsAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(AccountApi.getAccounts);
        yield put({type: types.GET_ACCOUNTS_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_ACCOUNTS_FAILURE, text: e.message});
    }
}

export function* getAccountBalance(action: GetAccountBalanceAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(AccountApi.getAccountBalance, action.params);
        yield put({type: types.GET_ACCOUNT_BALANCE_SUCCESS, data: {...action.params, balance: data}});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_ACCOUNT_BALANCE_FAILURE, params: {...action.params, error: e.message}});
    }
}

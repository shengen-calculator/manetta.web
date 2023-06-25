import initialState from './initialState';
import {types} from "../actions/types";
import {AccountState} from "./types";

export default function accountReducer(state = initialState.accounts, action: any): AccountState {
    switch (action.type) {

        case types.GET_ACCOUNTS_SUCCESS:
            return {
                ...state,
                items: action.data
            };

        case types.GET_ACCOUNT_BALANCE_SUCCESS:
            return {
                ...state,
                balances: [
                    ...state.balances.filter(bl => bl.accountName !== action.params.accountName),
                    {
                        accountName: action.params.accountName,
                        balance: action.params.data
                    }
                ]
            };

        default:
            return state;
    }
}

import initialState from './initialState';
import {types} from "../actions/types";
import {AccountState} from "./types";

export default function accountReducer(state = initialState.account, action: any): AccountState {
    switch (action.type) {

        case types.GET_ACCOUNTS_REQUEST:
            return {
                ...state,
                status: "REQUESTED"
            }

        case types.GET_ACCOUNTS_SUCCESS:
            return {
                ...state,
                status: "DEFINED",
                items: action.data.map((ac: Account) => {
                    const item = state.items.find(it => it.name === ac.name);
                    return {
                        name: ac.name,
                        currency: ac.currency,
                        isActive: ac.isActive,
                        balance: item ? item.balance : undefined
                    }
                })
            };

        case types.GET_ACCOUNT_BALANCE_SUCCESS:
            const item = state.items.find(it => it.name === action.data.accountName);
            return {
                ...state,
                items: [
                    ...state.items.filter((it) => it.name !== action.data.accountName),
                    {
                        name: item ? item.name : action.data.accountName,
                        isActive: item ? item.isActive : false,
                        currency: item ? item.currency : "",
                        balance: action.data.balance
                    }
                ]
            };

        case types.POST_OPERATIONS_SUCCESS:
            return {
                ...state,
                items: state.items.map(item => {
                    const postedRec = action.params.data.find((rec: any) => rec.account.name === item.name);
                    if (!postedRec) {
                        return item;
                    }
                    return {
                        ...item,
                        balance: postedRec.balance
                    }
                })
            }

        case types.REVERT_OPERATION_SUCCESS:
            return {
                ...state,
                items: state.items.map(item => {
                    const revertedRec = action.data.find((rec: any) => rec.account.name === item.name);
                    if (!revertedRec) {
                        return item;
                    }
                    return {
                        ...item,
                        balance: revertedRec.balance
                    }
                })
            }

        default:
            return state;
    }
}

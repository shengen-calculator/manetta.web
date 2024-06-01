import {functions} from './database';
import { httpsCallable } from "firebase/functions";

class AccountApi {

    static getAccounts()  {
        const func = httpsCallable(functions, 'account-getAllAccounts');
        return func();
    }

    static getAccountBalance(params: GetAccountBalanceParams)  {
        const func = httpsCallable(functions, 'account-getAccountBalance');
        return func(params);
    }
}

export default AccountApi;

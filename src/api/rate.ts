import {functions} from './database';
import { httpsCallable } from "firebase/functions";

class RateApi {
    static getRates()  {
        const func = httpsCallable(functions, 'currency-getCurrencyRate');
        return func();
    }

    static createRate(params: CreateRateParams) {
        const func = httpsCallable(functions, 'currency-addCurrencyRate');
        return func(params);
    }
}

export default RateApi;

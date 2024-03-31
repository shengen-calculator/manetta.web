import {functions} from './database';
import { httpsCallable } from "firebase/functions";

class RateApi {
    static getRates()  {
        const func = httpsCallable(functions, 'currency-getAllGroups');
        return func();
    }

    static createRate(params: CreateRateParams) {
        const func = httpsCallable(functions, 'currency-saveGroup');
        return func(params);
    }
}

export default RateApi;

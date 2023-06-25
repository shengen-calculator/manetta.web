import {functions} from './database';
import { httpsCallable } from "firebase/functions";

class OperationApi {

    static deleteOperation(params: DeleteOperationParams){
        const func = httpsCallable(functions, 'operation-deleteOperation');
        return func(params);
    }

    static createOperation(params: CreateOperationParams) {
        const func = httpsCallable(functions, 'operation-saveOperation');
        return func(params);
    }

    static updateOperation(params: UpdateOperationParams) {
        const func = httpsCallable(functions, 'operation-saveOperation');
        return func(params);
    }

    static postOperations(params: PostOperationsParams) {
        const func = httpsCallable(functions, 'operation-postOperations');
        return func(params);
    }

    static getOperations()  {
        const func = httpsCallable(functions, 'operation-getAllOperation');
        return func();
    }
}

export default OperationApi;

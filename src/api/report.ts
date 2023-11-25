import {functions} from './database';
import { httpsCallable } from "firebase/functions";

class ReportApi {
    static generateExpensesReport(params: GenerateExpensesReportParams) {
        const func = httpsCallable(functions, 'operation-operationReport');
        return func(params);
    }
}

export default ReportApi;

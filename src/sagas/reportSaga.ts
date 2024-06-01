import {call, put} from "redux-saga/effects";
import {GenerateReportAction} from "../redux/actions/reportActions";
import {types} from "../redux/actions/types";
import ReportApi from "../api/report";

export function* generateExpensesReport(action: GenerateReportAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(ReportApi.generateExpensesReport, action.params);
        yield put({type: types.GENERATE_EXPENSES_REPORT_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GENERATE_EXPENSES_REPORT_FAILURE, params: {...action.params, error: e.message}});
    }
}

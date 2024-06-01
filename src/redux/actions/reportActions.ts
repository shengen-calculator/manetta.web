import {types} from "./types";

export type GenerateReportAction = {
    type: types.GENERATE_EXPENSES_REPORT_REQUEST
    params: GenerateExpensesReportParams
}

export type ReportPeriodExceededAction = {
    type: types.REPORT_PERIOD_EXCEEDED
    params: ReportPeriodExceededParams
}

export function generateReportRequest(params: GenerateExpensesReportParams): GenerateReportAction {
    return {type: types.GENERATE_EXPENSES_REPORT_REQUEST, params}
}

export function reportPeriodExceeded(params: ReportPeriodExceededParams): ReportPeriodExceededAction {
    return {type: types.REPORT_PERIOD_EXCEEDED, params}
}

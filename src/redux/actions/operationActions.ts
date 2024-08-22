import {types} from "./types";

export type GetOperationsAction = {
    type: types.GET_OPERATIONS_REQUEST
}

export type GetRecentlyPostedAction = {
    type: types.GET_RECENTLY_POSTED_REQUEST
    params: GetRecentlyPostedParams
}

export type GetReportRecordsAction = {
    type: types.GET_REPORT_RECORDS_REQUEST
    params: GetReportRecordsParams
}

export type PostOperationsAction = {
    type: types.POST_OPERATIONS_REQUEST
    params: PostOperationsParams
}

export type CreateOperationAction = {
    type: types.CREATE_OPERATION_REQUEST
    params: CreateOperationParams
}

export type UpdateOperationAction = {
    type: types.UPDATE_OPERATION_REQUEST
    params: UpdateOperationParams
}

export type RevertOperationAction = {
    type: types.REVERT_OPERATION_REQUEST
    params: RevertOperationParams
}

export type DeleteOperationAction = {
    type: types.DELETE_OPERATION_REQUEST
    params: DeleteOperationParams
}

export function getOperationsRequest(): GetOperationsAction {
    return {type: types.GET_OPERATIONS_REQUEST}
}

export function getRecentlyPostedRequest(params: GetRecentlyPostedParams): GetRecentlyPostedAction {
    return {type: types.GET_RECENTLY_POSTED_REQUEST, params}
}

export function getReportRecordsRequest(params: GetReportRecordsParams): GetReportRecordsAction {
    return {type: types.GET_REPORT_RECORDS_REQUEST, params}
}

export function postOperationsRequest(params: PostOperationsParams): PostOperationsAction {
    return {type: types.POST_OPERATIONS_REQUEST, params}
}

export function createOperationRequest(params: CreateOperationParams): CreateOperationAction {
    return {type: types.CREATE_OPERATION_REQUEST, params}
}

export function deleteOperationRequest(params: DeleteOperationParams): DeleteOperationAction {
    return {type: types.DELETE_OPERATION_REQUEST, params}
}

export function updateOperationRequest(params: UpdateOperationParams): UpdateOperationAction {
    return {type: types.UPDATE_OPERATION_REQUEST, params}
}

export function revertOperationRequest(params: RevertOperationParams): RevertOperationAction {
    return {type: types.REVERT_OPERATION_REQUEST, params}
}

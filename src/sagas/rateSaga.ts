import {CreateRateAction, GetRatesAction} from "../redux/actions/rateActions";
import {call, put} from "redux-saga/effects";
import {types} from "../redux/actions/types";
import RateApi from "../api/rate";

export function* getRates(action: GetRatesAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const {data} = yield call(RateApi.getRates);
        yield put({type: types.GET_CURRENCY_RATES_SUCCESS, data});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_CURRENCY_RATES_FAILURE, text: e.message});
    }
}

export function* createRate(action: CreateRateAction) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        yield call(RateApi.createRate, action.params);
        yield put({type: types.CREATE_CURRENCY_RATE_SUCCESS, params: {...action.params}});
    } catch (e: any) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.CREATE_CURRENCY_RATE_FAILURE, params: {...action.params, error: e.message}});
    }
}

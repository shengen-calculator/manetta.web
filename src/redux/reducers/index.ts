import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import message from "./messageReducer";
import operation from "./operationReducer";
import group from "./groupReducer";
import history from "./historyReducer";
import tag from "./tagReducer";
import rate from "./rateReducer";
import report from "./reportReducer";
import account from "./accountReducer";
import apiCallsInProgress from "./apiStatusReducer";
import {persistReducer} from "redux-persist";

export const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'message',
        'authentication',
        'apiCallsInProgress',
        'operation',
        'account',
        'history',
        'report',
        'group',
        'rate',
        'tag'
    ]
};

const authPersistConfig = {
    key: 'authentication',
    storage: storage,
    blacklist: ['logging', 'registering']
};

const rootReducer = combineReducers({
    authentication: persistReducer(authPersistConfig, authentication),
    message,
    apiCallsInProgress,
    operation,
    history,
    account,
    report,
    group,
    rate,
    tag
});

export default rootReducer;

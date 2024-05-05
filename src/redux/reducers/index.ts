import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import message from "./messageReducer";
import operations from "./operationReducer";
import group from "./groupReducer";
import history from "./historyReducer";
import tags from "./tagReducer";
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
        'operations',
        'account',
        'history',
        'report',
        'group',
        'rate',
        'tags'
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
    operations,
    history,
    account,
    report,
    group,
    rate,
    tags
});

export default rootReducer;

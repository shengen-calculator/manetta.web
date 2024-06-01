import {createStore, applyMiddleware} from 'redux';
import rootReducer, {persistConfig} from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import mySaga from "../sagas";

export default function configureStore(initialState: any) {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const sagaMiddleware = createSagaMiddleware();
    const middleware = process.env.NODE_ENV !== 'production' ?
        [require('redux-immutable-state-invariant').default(), sagaMiddleware] :
        [sagaMiddleware];
    const store = createStore(
        persistedReducer,
        initialState,
        applyMiddleware(...middleware)
    );
    // noinspection JSUnresolvedFunction
    sagaMiddleware.run(mySaga);
    let persistent = persistStore(store);
    return {store, persistent};
}

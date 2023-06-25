import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import {RouterProvider} from "react-router-dom";
import AppRouts from "./component/AppRouts";
import {PersistGate} from 'redux-persist/integration/react'
import initialState from "./redux/reducers/initialState";
import configureStore from "./redux/configureStore";
import {Provider} from "react-redux";
import ToastrMessage from "./component/ToastrMessage";
import {SnackbarProvider} from "notistack";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
const {store, persistent} = configureStore(initialState);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistent}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline/>
                        <RouterProvider router={AppRouts}/>
                        <ToastrMessage/>
                    </SnackbarProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

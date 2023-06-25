import * as React from 'react';
import {createBrowserRouter} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "./ErrorPage";
import HomePage from "../page/home/HomePage";
import App from "../App";
import OperationsPage from "../page/operations/OperationsPage";
import ProTip from "../ProTip";
import GroupsPage from "../page/groups/GroupsPage";
import LoginPage from "../page/auth/LoginPage";
import RatesPage from "../page/rates/RatesPage";
import HistoryPage from "../page/history/HistoryPage";
import RegistrationPage from "../page/auth/RegistrationPage";

const AppRouts = createBrowserRouter(
    [
        {
            path: "/",
            element: <PrivateRoutes roles={["ADMIN", "BOOKER"]}/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "/",
                    element: <HomePage/>
                },
                {
                    path: "/app",
                    element: <App/>
                },
                {
                    path: "/operations",
                    element: <OperationsPage/>
                }
            ]
        },
        {
            path: "/",
            element: <PrivateRoutes roles={["ADMIN"]}/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "/history",
                    element: <HistoryPage/>
                },
                {
                    path: "/protip/:tipId",
                    element: <ProTip/>
                },
                {
                    path: "/groups",
                    element: <GroupsPage/>
                },
                {
                    path: "/rates",
                    element: <RatesPage/>
                }
            ]
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/registration",
            element: <RegistrationPage/>
        }
    ]
);

export default AppRouts;

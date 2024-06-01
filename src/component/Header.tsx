import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from "react-redux";
import {logoutRequest, LogoutAction} from "../redux/actions/authenticationActions";
import {Tooltip} from "@mui/material";
import {
    GetRatesAction,
    getRatesRequest,
    createRateRequest,
    CreateRateAction
} from "../redux/actions/rateActions";
import {useEffect} from "react";
import {ApplicationState, RateState} from "../redux/reducers/types";
import Rate from "./Rate";

interface HeaderProps {
    menuItems: ReadonlyArray<{
        title: string;
        tooltip: string;
        url: string;
    }>;
    title: string;
    rate: RateState;
    getRatesRequest: () => GetRatesAction;
    createRateRequest: (params: CreateRateParams) => CreateRateAction;
    logoutRequest: () => LogoutAction | undefined;
}

const Header = (props: HeaderProps) => {
    const { menuItems, title, logoutRequest, getRatesRequest, createRateRequest, rate } = props;
    let initStatus: InitStatus = "NOT_STARTED";

    useEffect(() => {
        if (rate.status === "NOT_DEFINED" && initStatus !== "STARTED") {
            getRatesRequest();
            initStatus = "STARTED";
        }
        if (rate.status === "DEFINED") {
            initStatus = "FINISHED";
        }
    }, [rate.status]);

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <Rate abbreviations={["USD", "UAH"]} rates={rate.items} createRate={createRateRequest}/>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ml:4}}
                    onClick={logoutRequest}
                >
                    Log out
                </Button>
            </Toolbar>

            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {menuItems.map((section) => (
                    <Tooltip key={section.title} title={section.tooltip}>
                        <Link
                            color="inherit"
                            component={RouterLink}
                            noWrap
                            variant="body2"
                            to={section.url}
                            sx={{ p: 1, flexShrink: 0 }}
                        >
                            {section.title}
                        </Link>
                    </Tooltip>
                ))}
            </Toolbar>
        </React.Fragment>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        rate: state.rate
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    logoutRequest,
    getRatesRequest,
    createRateRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

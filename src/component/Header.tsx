import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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
import {ApplicationState} from "../redux/reducers/types";
import Rate from "./Rate";

interface HeaderProps {
    menuItems: ReadonlyArray<{
        title: string;
        tooltip: string;
        url: string;
    }>;
    title: string;
    rates: Rates;
    getRatesRequest: () => GetRatesAction;
    createRateRequest: (params: CreateRateParams) => CreateRateAction;
    logoutRequest: () => LogoutAction | undefined;
}

const Header = (props: HeaderProps) => {
    const { menuItems, title, logoutRequest, getRatesRequest, createRateRequest, rates } = props;
    let isDataRequested = false;

    useEffect(() => {
        if (rates.status === "NOT_DEFINED" && !isDataRequested) {
            getRatesRequest();
            isDataRequested = true;
        }
        if (rates.status === "DEFINED") {
            isDataRequested = false;
        }
    }, [rates.status]);

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
                <Rate abbreviations={["USD", "UAH"]} rates={rates} createRate={createRateRequest}/>
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
                    <Tooltip title={section.tooltip}>
                        <Link
                            color="inherit"
                            noWrap
                            key={section.title}
                            variant="body2"
                            href={section.url}
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
        rates: state.rates
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

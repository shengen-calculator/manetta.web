import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {AccountState, ApplicationState} from "../../redux/reducers/types";
import {GetAccountBalanceAction, getAccountBalanceRequest} from "../../redux/actions/accountActions";
import {connect} from "react-redux";
import {useEffect} from "react";

interface AccountSummaryProps {
    accountInfo: AccountInfo
    account: AccountState
    getAccountBalanceRequest: (params: GetAccountBalanceParams) => GetAccountBalanceAction
}

const AccountSummary: React.FC<AccountSummaryProps> = (
    {
        accountInfo,
        account,
        getAccountBalanceRequest
    }
) => {
    let initStatus: InitStatus = "NOT_STARTED";
    useEffect(() => {
        const item = account.items.find(it => it.name === accountInfo.accountName);
        const balance = item ? item.balance : undefined;
        if (!balance && initStatus === "NOT_STARTED") {
            getAccountBalanceRequest({
                accountName: accountInfo.accountName
            })
            initStatus = "STARTED";
        }
    }, []);
    const acc = account.items.find(bl => bl.name === accountInfo.accountName);
    const balance = acc && acc.balance ? acc.balance : 0;
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card sx={{display: 'flex'}}>
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {accountInfo.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {`Balance: ${balance / 100}`}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{width: 160, display: {xs: 'none', sm: 'block'}}}
                        image={accountInfo.imagePath}
                        alt={accountInfo.title}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        account: state.account,
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    getAccountBalanceRequest,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountSummary)

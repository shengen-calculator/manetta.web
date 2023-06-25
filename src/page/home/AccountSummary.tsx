import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {AccountBalance, ApplicationState} from "../../redux/reducers/types";
import {GetAccountBalanceAction, getAccountBalanceRequest} from "../../redux/actions/accountActions";
import {connect} from "react-redux";
import {useEffect} from "react";

interface AccountSummaryProps {
    account: AccountInfo
    balances: AccountBalance[]
    getAccountBalanceRequest: (params: GetAccountBalanceParams) => GetAccountBalanceAction
}

const AccountSummary: React.FC<AccountSummaryProps> = (
    {
        account,
        balances,
        getAccountBalanceRequest
    }
) => {
    let isDataRequested = false;
    useEffect(() => {
        if(!isDataRequested) {
            isDataRequested = true;
            getAccountBalanceRequest({
                accountName: account.accountName
            })
        }
    }, []);
    const acc = balances.find(bl => bl.accountName === account.accountName);
    const balance = acc && acc.balance ? acc.balance : 0;
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card sx={{display: 'flex'}}>
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {account.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {`Balance: ${balance / 100}`}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{width: 160, display: {xs: 'none', sm: 'block'}}}
                        image={account.imagePath}
                        alt={account.title}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        balances: state.accounts.balances,
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

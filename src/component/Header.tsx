import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {connect} from "react-redux";
import {logoutRequest, LogoutAction} from "../redux/actions/authenticationActions";

interface HeaderProps {
    menuItems: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
    logoutRequest: () => LogoutAction | undefined
}

const Header = (props: HeaderProps) => {
    const { menuItems, title, logoutRequest } = props;

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
                <Button size="small">$ 37.60</Button>
                <Button size="small">€ 40.60</Button>
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
                ))}
            </Toolbar>
        </React.Fragment>
    );
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    logoutRequest
};

export default connect(
    undefined,
    mapDispatchToProps
)(Header);

import * as React from 'react';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import {
    Avatar,
    Button,
    CssBaseline,
    Grid,
    Paper,
    ThemeProvider
} from "@mui/material";
import theme from "../../theme";
import Copyright from "../../component/Copyright";
import TextInput from "../../component/TextInput";
import {useEffect, useState} from "react";
import {ApplicationState, AuthenticationState} from "../../redux/reducers/types";
import {AuthenticationAction, authenticationRequest} from "../../redux/actions/authenticationActions";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

type Authentication = {
    email: string
    password: string
    requestInProcess: boolean
}

interface LoginPageProps {
    auth: AuthenticationState
    authenticationRequest: (params: AuthenticationParams) => AuthenticationAction | undefined
}

const LoginPage: React.FC<LoginPageProps> = (
    {
        auth,
        authenticationRequest
    }
) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (auth.logging && !authentication.requestInProcess) {
            setAuthentication(prev => ({
                ...prev,
                requestInProcess: true
            }));
        }

        if (!auth.logging && authentication.requestInProcess && !auth.error) {
            navigate('/');
        }

        if (!auth.logging && authentication.requestInProcess) {
            setAuthentication(prev => ({
                ...prev,
                email: "",
                password: "",
                requestInProcess: false
            }));
        }

    }, [auth.logging]);

    const [authentication, setAuthentication] = useState<Authentication>({
        email: '',
        password: '',
        requestInProcess: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setAuthentication(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (authentication.email && authentication.password) {
            authenticationRequest({
                email: authentication.email,
                password: authentication.password
            })
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/login.avif?alt=media&token=3cfcd5c6-ef66-4b55-a149-c997109fe280)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextInput
                                id="email"
                                label="Email Address"
                                autoFocus={true}
                                onChange={handleChange}
                                value={authentication.email}
                            />
                            <TextInput
                                id="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={authentication.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={authentication.requestInProcess}
                                sx={{mt: 3, mb: 2}}
                            >
                                {authentication.requestInProcess ? "Signing in..." : "Sing In"}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Link href="/registration" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        auth: state.authentication
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    authenticationRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

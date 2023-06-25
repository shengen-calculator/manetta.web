import * as React from 'react';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
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
import {purple} from "@mui/material/colors";
import TextInput from "../../component/TextInput";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RegistrationAction, registrationRequest} from "../../redux/actions/authenticationActions";
import {connect} from "react-redux";
import {ApplicationState, AuthenticationState} from "../../redux/reducers/types";

type Registration = {
    email: string
    password: string
    requestInProcess: boolean
}

interface RegistrationPageProps {
    auth: AuthenticationState,
    registrationRequest: (params: RegistrationParams) => RegistrationAction | undefined
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({
                                                               auth,
                                                               registrationRequest
                                                           }) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (auth.registering && !registration.requestInProcess) {
            setRegistration(prev => ({
                ...prev,
                requestInProcess: true
            }));
        }

        if (!auth.registering && registration.requestInProcess && !auth.error) {
            navigate('/login');
        }

        if (!auth.registering && registration.requestInProcess) {
            setRegistration(prev => ({
                ...prev,
                email: "",
                password: "",
                requestInProcess: false
            }));
        }
    }, [auth.registering]);

    const [registration, setRegistration] = useState<Registration>({
        email: '',
        password: '',
        requestInProcess: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setRegistration(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registration.email && registration.password) {
            registrationRequest({
                email: registration.email,
                password: registration.password
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
                        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/registration.avif?alt=media&token=9d626bd5-e5ac-4b27-8623-568363b2c600)',
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
                        <Avatar sx={{m: 1, bgcolor: purple[500]}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextInput
                                id="email"
                                label="Email Address"
                                autoFocus={true}
                                onChange={handleChange}
                                value={registration.email}
                            />
                            <TextInput
                                id="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                                value={registration.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={registration.requestInProcess}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    bgcolor: purple[500],
                                    ':hover': {
                                        bgcolor: purple[700]
                                    }
                                }}
                            >
                                {registration.requestInProcess ? "Signing up..." : "Sign Up"}
                            </Button>
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
    registrationRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationPage);


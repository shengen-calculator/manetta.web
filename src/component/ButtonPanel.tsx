import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import {LinearProgress, Tooltip} from "@mui/material";
import {ApplicationState} from "../redux/reducers/types";
import {connect} from "react-redux";

interface ButtonPanelProps {
    buttons: PanelButton[],
    apiCallsInProgress: number
}

const ButtonPanel: React.FC<ButtonPanelProps> = (
    {
        buttons,
        apiCallsInProgress
    }
) => {
    let btnId = 1;
    return (
        <React.Fragment>
            <Toolbar
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url('https://source.unsplash.com/featured')`,
                }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                </Typography>
                {
                    buttons.map(btn => {
                            return (
                                <Tooltip key={btnId++} title={btn.tooltip}>
                                    <Button
                                        onClick={btn.onClick}
                                        disabled={btn.disabled}
                                        variant="outlined"
                                        size="small"
                                        color="inherit"
                                        sx={{ml: 3}}
                                    >
                                        {btn.btnText}
                                    </Button>
                                </Tooltip>
                            )
                        }
                    )
                }

            </Toolbar>
            {apiCallsInProgress > 0 ? <LinearProgress color="inherit"/> : null}
        </React.Fragment>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        apiCallsInProgress: state.apiCallsInProgress
    }
};

export default connect(
    mapStateToProps
)(ButtonPanel)

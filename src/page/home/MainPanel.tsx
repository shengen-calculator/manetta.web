import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {LinearProgress} from "@mui/material";
import {ApplicationState} from "../../redux/reducers/types";
import {connect} from "react-redux";

interface MainPanelProps {
    apiCallsInProgress: number,
    post: {
        description: string;
        image: string;
        imageText: string;
        title: string;
    };
}

const MainPanel: React.FC<MainPanelProps> = (
    {
        post,
        apiCallsInProgress
    }
) => {
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${post.image})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {post.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            { apiCallsInProgress > 0 ? <LinearProgress color="inherit" /> : null }
        </Paper>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        apiCallsInProgress: state.apiCallsInProgress
    }
};

export default connect(
    mapStateToProps
)(MainPanel)

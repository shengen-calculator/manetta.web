import * as React from 'react';
import { useRouteError } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ErrorPage() {
    const error = useRouteError() as RouteError;
    console.error(error);

    return (
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Oops!
                </Typography>
                <Typography paragraph={true} variant="body1" gutterBottom>
                    Sorry, an unexpected error has occurred.
                </Typography>
                <Typography color="text.secondary" paragraph={true} sx={{fontStyle: 'italic'}} variant="body1" gutterBottom>
                    {error.statusText || error.message}
                </Typography>
            </Box>
        </Container>
    );
}

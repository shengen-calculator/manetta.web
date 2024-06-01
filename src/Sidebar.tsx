import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

interface SidebarProps {
    description: string;
    title: string;
}

export default function Sidebar(props: SidebarProps) {
    const { description, title } = props;

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography>{description}</Typography>
                <Box sx={{color: 'primary.main'}}>primary.main</Box>
                <Box sx={{color: 'secondary.main'}}>secondary.main</Box>
                <Box sx={{color: 'error.main'}}>error.main</Box>
                <Box sx={{color: 'warning.main'}}>warning.main</Box>
                <Box sx={{color: 'info.main'}}>info.main</Box>
                <Box sx={{color: 'success.main'}}>success.main</Box>
                <Box sx={{color: 'text.primary'}}>text.primary</Box>
                <Box sx={{color: 'text.secondary'}}>text.secondary</Box>
                <Box sx={{color: 'text.disabled'}}>text.disabled</Box>
            </Paper>
        </Grid>
    );
}

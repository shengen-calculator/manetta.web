import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

interface TemplateProps {
    template: {
        description: string;
        title: string;
        tags: string[];
    };
    open: (title: string, tags: string[]) => void

}

export default function OperationTemplate(props: TemplateProps) {
    const { template, open} = props;

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" onClick={() => open(template.title, template.tags)}>
                <Card sx={{ display: 'flex', bgcolor: 'grey.200' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {template.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {template.description}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

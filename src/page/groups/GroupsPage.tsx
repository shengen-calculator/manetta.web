import * as React from 'react';
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { styled } from '@mui/material/styles';
import ButtonPanel from "../../component/ButtonPanel";
import {Chip, ListItem, Paper, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import menuItems from "../../component/menuItems";



export default function GroupsPage() {
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(1.5),
    }));
    const panelButtons: PanelButton[] = [{
        btnText: "NEW GROUP",
        disabled: false,
        onClick: () => {
        }
    }];
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MANETTA" menuItems={menuItems} />
                <main>
                    <ButtonPanel buttons={panelButtons} />
                    <Grid item xs={12} md={6} >
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 2.5,
                                m: 0,
                            }}

                            component="ul"
                        >

                            <ListItem key={1}>
                                <Chip label="Dastor" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={2}>
                                <Chip label="Silpo" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={3}>
                                <Chip label="Fenix expenses" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={4}>
                                <Chip label="Spain 2022" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={5}>
                                <Chip label="Fencing" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={6}>
                                <Chip label="Competition" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={7}>
                                <Chip label="Shtefanyo" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={8}>
                                <Chip label="Eva" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={9}>
                                <Chip label="Lidl" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={10}>
                                <Chip label="DM" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={11}>
                                <Chip label="Fenix profit" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={12}>
                                <Chip label="VMware" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={13}>
                                <Chip label="Restaurants" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={14}>
                                <Chip label="Electricity apartment" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={15}>
                                <Chip label="Diesel" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={16}>
                                <Chip label="BMW" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={17}>
                                <Chip label="Water apartment" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={18}>
                                <Chip label="Gauze apartment" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={19}>
                                <Chip label="Dastor" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={20}>
                                <Chip label="Silpo" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>
                            <ListItem key={21}>
                                <Chip label="Dastor" onDelete={()=>{alert("deleted!")}} onClick={() => {alert("edit!")}} />
                            </ListItem>
                            <ListItem key={22}>
                                <Chip label="Silpo" variant="outlined" onDelete={()=>{alert("delete!")}} onClick={() => {alert("edit!")}}/>
                            </ListItem>


                        </Paper>
                    </Grid>
                </main>
            </Container>
            <Footer
                description="Accounting it's easy!"
            />
        </ThemeProvider>
    );
}

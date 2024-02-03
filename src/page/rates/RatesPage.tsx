import * as React from 'react';
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import {styled} from '@mui/material/styles';
import ButtonPanel from "../../component/ButtonPanel";
import {Chip, ListItem, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import menuItems from "../../component/menuItems";
import {getHandlers, keyMap} from "../../component/KeyMapHandlers";
import {HotKeys} from "react-hotkeys";
import {useNavigate} from "react-router-dom";


export default function RatesPage() {
    const ListItem = styled('li')(({theme}) => ({
        margin: theme.spacing(1.5),
    }));
    const panelButtons: PanelButton[] = [{
        btnText: "NEW RATE",
        tooltip: "Hot key: Alt (option) + P",
        disabled: false,
        onClick: () => {
        }
    }];
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <HotKeys handlers={getHandlers(navigate, null)} keyMap={keyMap}>
                    <Header title="MANETTA" menuItems={menuItems}/>
                    <main>
                        <ButtonPanel buttons={panelButtons}/>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6}>
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
                                        <Chip label="EUR 41.50 - 23.04.2023" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={2}>
                                        <Chip label="EUR 41.20 - 22.04.2023" onDelete={() => {
                                            alert("delete!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={3}>
                                        <Chip label="EUR 41.05 - 21.04.2023" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={4}>
                                        <Chip label="EUR 38.05 - 20.04.2023" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={5}>
                                        <Chip label="EUR 41.50 - 19.04.2023" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={6}>
                                        <Chip label="EUR 41.20 - 18.04.2023" onDelete={() => {
                                            alert("delete!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={7}>
                                        <Chip label="EUR 41.05 - 17.04.2023" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={8}>
                                        <Chip label="EUR 38.05 - 16.04.2023" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={9}>
                                        <Chip label="EUR 41.50 - 15.04.2023" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={10}>
                                        <Chip label="EUR 41.20 - 14.04.2023" onDelete={() => {
                                            alert("delete!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                </Paper>
                            </Grid>

                            <Grid item xs={6} md={6}>
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

                                    <ListItem key={11}>
                                        <Chip label="USD 41.05 - 13.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={12}>
                                        <Chip label="USD 38.05 - 12.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={13}>
                                        <Chip label="USD 41.50 - 11.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={14}>
                                        <Chip label="USD 41.20 - 10.04.2023" variant="outlined" onDelete={() => {
                                            alert("delete!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={15}>
                                        <Chip label="USD 41.05 - 09.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={16}>
                                        <Chip label="USD 38.05 - 08.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={17}>
                                        <Chip label="USD 41.50 - 07.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={18}>
                                        <Chip label="USD 41.20 - 06.04.2023" variant="outlined" onDelete={() => {
                                            alert("delete!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={19}>
                                        <Chip label="USD 41.05 - 05.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                    <ListItem key={20}>
                                        <Chip label="USD 38.05 - 04.04.2023" variant="outlined" onDelete={() => {
                                            alert("deleted!")
                                        }} onClick={() => {
                                            alert("edit!")
                                        }}/>
                                    </ListItem>
                                </Paper>
                            </Grid>
                        </Grid>
                    </main>
                </HotKeys>
            </Container>
            <Footer
                description="Accounting it's easy!"
            />
        </ThemeProvider>
    );
}

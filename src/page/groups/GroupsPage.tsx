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
import {
    DeleteGroupAction,
    deleteGroupRequest,
    GetGroupsAction,
    getGroupsRequest
} from "../../redux/actions/groupActions";
import {connect} from "react-redux";
import {ApplicationState} from "../../redux/reducers/types";
import {useEffect} from "react";


interface GroupsPageProps {
    deleteGroupRequest: (params: DeleteGroupParams) => DeleteGroupAction,
    getGroupsRequest: () => GetGroupsAction
    groups: Array<Group>
}

const GroupsPage: React.FC<GroupsPageProps> = (
    {
        deleteGroupRequest,
        getGroupsRequest,
        groups
    }
) => {
    let isDataRequested = false;
    useEffect(() => {
        if (!isDataRequested) {
            isDataRequested = true;
            getGroupsRequest();
        }
    }, []);
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(1.5),
    }));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MANETTA" menuItems={menuItems} />
                <main>
                    <ButtonPanel buttons={[]} />
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
                            {
                                groups.map((group) => (
                                    <ListItem key={group.name}>
                                        <Chip
                                            label={group.name}
                                            onClick={() => {alert("edit!")}}
                                        />
                                    </ListItem>
                                ))
                            }
                        </Paper>
                    </Grid>
                </main>
            </Container>
            <Footer
                description="Accounting it's easy!"
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        groups: state.groups
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    getGroupsRequest,
    deleteGroupRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupsPage)

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
import {
    DeleteGroupAction,
    deleteGroupRequest,
    GetGroupsAction,
    getGroupsRequest
} from "../../redux/actions/groupActions";
import {connect} from "react-redux";
import {ApplicationState} from "../../redux/reducers/types";
import {useEffect} from "react";
import GroupDialog from "./GroupDialog";
import {getHandlers, keyMap} from "../../component/KeyMapHandlers";
import {HotKeys} from "react-hotkeys";
import {useNavigate} from "react-router-dom";

type GroupDialogStatus = {
    isOpen: boolean,
    groupName: string,
    tags: string[]
}

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

    const [groupDialogStatus, setGroupDialogStatus] = React.useState<GroupDialogStatus>({
        isOpen: false,
        groupName: "",
        tags: []
    });

    const openGroupDialog = (group: Group) => {
        setGroupDialogStatus({
            ...groupDialogStatus,
            isOpen: true,
            groupName: group.name,
            tags: group.tags
        });
    };

    const handleGroupDialogCancel = () => {
        setGroupDialogStatus({
            ...groupDialogStatus,
            isOpen: false
        });
    };

    const deleteGroup = (name: string) => {
        deleteGroupRequest({
           name
        });
        setGroupDialogStatus({
            ...groupDialogStatus,
            isOpen: false
        });
    };

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(1.5),
    }));

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <GroupDialog
                    isOpen={groupDialogStatus.isOpen}
                    groupName={groupDialogStatus.groupName}
                    tags={groupDialogStatus.tags}
                    onCancel={handleGroupDialogCancel}
                    deleteGroup={deleteGroup}
                />
                <HotKeys handlers={getHandlers(navigate)} keyMap={keyMap}>
                    <Header title="MANETTA" menuItems={menuItems}/>
                    <main>
                        <ButtonPanel buttons={[]}/>
                        <Grid item xs={12} md={6}>
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
                                    groups.map((group, index) => (
                                        <ListItem key={group.name}>
                                            <Chip
                                                label={group.name}
                                                onClick={() => openGroupDialog(group)}
                                                variant={(index % 2 == 0) ? "outlined" : "filled"}
                                            />
                                        </ListItem>
                                    ))
                                }
                            </Paper>
                        </Grid>
                    </main>
                </HotKeys>
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

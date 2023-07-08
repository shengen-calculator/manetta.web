import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';
import Footer from '../../component/Footer';
import theme from "../../theme";
import Header from "../../component/Header";
import ButtonPanel from "../../component/ButtonPanel";
import OperationTable from "./OperationTable";
import menuItems from "../../component/menuItems";
import {connect} from "react-redux";
import {ApplicationState, OperationState} from "../../redux/reducers/types";
import PostDialog from "./PostDialog";
import {PostOperationsAction, postOperationsRequest} from "../../redux/actions/operationActions";
import TagDialog from "./TagDialog";

type RowStatus = {
    key: number
    isValid: boolean
}

type PostDialogStatus = {
    isOpen: boolean
    asSingle: boolean
}

type TagDialogStatus = {
    isOpen: boolean
    tagDialogParams: TagDialogParams
}

interface OperationsPageProps {
    postOperationsRequest: (params: PostOperationsParams) => PostOperationsAction,
    operations: OperationState
}

const OperationsPage: React.FC<OperationsPageProps> = (
    {
        postOperationsRequest,
        operations
    }
) => {

    const post = (postAsSingle: boolean) => {
        postOperationsRequest({
            postAsSingle: postAsSingle,
            ids: rowStatuses.filter(st => st.isValid).map(rs => rs.key.toString())
        });
        setPostDialogStatus({
            ...postDialogStatus,
            isOpen: false
        });
    };

    const saveTags = () => {
        console.log(`Save tags params: ${JSON.stringify(tagDialogStatus.tagDialogParams)}`);
        setTagDialogStatus({
            ...tagDialogStatus,
            isOpen: false
        });
    };

    const [rowStatuses, setRowStatuses] = React.useState<RowStatus[]>([]);
    const [postDialogStatus, setPostDialogStatus] = React.useState<PostDialogStatus>({
        isOpen: false,
        asSingle: false
    });

    const [tagDialogStatus, setTagDialogStatus] = React.useState<TagDialogStatus>({
        isOpen: false,
        tagDialogParams: {
            tags: [],
            operationId: 0,
            groupName: ""
        }
    });

    const nonZeroOperations = [...operations.items].filter(opr => opr.sum);

    const panelButtons: PanelButton[] = [{
        btnText: "POST",
        disabled: rowStatuses.some(rs => !rs.isValid) || nonZeroOperations.length === 0,
        onClick: () => setPostDialogStatus({
            isOpen: true,
            asSingle: false
        })
    }, {
        btnText: "POST AS SINGLE",
        disabled: rowStatuses.some(rs => !rs.isValid) || nonZeroOperations.length === 0,
        onClick: () => setPostDialogStatus({
            isOpen: true,
            asSingle: true
        })
    }];

    const handlePostDialogCancel = () => {
        setPostDialogStatus({
            ...postDialogStatus,
            isOpen: false
        });
    };

    const tagDialogOpen = (tagDialogParams: TagDialogParams) => {
        setTagDialogStatus({
            ...tagDialogStatus,
            tagDialogParams,
            isOpen: true
        });
    };

    const handleTagDialogCancel = () => {
        setTagDialogStatus({
            ...tagDialogStatus,
            isOpen: false
        });
    };

    const saveRowStatus = (key: number, isValid: boolean) => {
        setRowStatuses((prev) => [
            ...prev.filter(rs => rs.key !== key),
            {
                key,
                isValid
            }
        ]);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <PostDialog
                    isOpen={postDialogStatus.isOpen}
                    asSingle={postDialogStatus.asSingle}
                    onCancel={handlePostDialogCancel}
                    post={post}
                />
                <TagDialog
                    isOpen={tagDialogStatus.isOpen}
                    onCancel={handleTagDialogCancel}
                    save={saveTags}
                />
                <Header title="MANETTA" menuItems={menuItems}/>
                <main>
                    <ButtonPanel buttons={panelButtons}/>
                    <OperationTable
                        saveRowStatus={saveRowStatus}
                        tagDialogOpen={tagDialogOpen}
                    />
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
        operations: state.operations
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    postOperationsRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationsPage)

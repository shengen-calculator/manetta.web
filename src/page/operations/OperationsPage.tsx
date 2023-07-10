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
import {
    PostOperationsAction,
    postOperationsRequest
} from "../../redux/actions/operationActions";

type RowStatus = {
    key: number
    isValid: boolean
}

type PostDialogStatus = {
    isOpen: boolean
    asSingle: boolean
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

    const [rowStatuses, setRowStatuses] = React.useState<RowStatus[]>([]);
    const [postDialogStatus, setPostDialogStatus] = React.useState<PostDialogStatus>({
        isOpen: false,
        asSingle: false
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
                <Header title="MANETTA" menuItems={menuItems}/>
                <main>
                    <ButtonPanel buttons={panelButtons}/>
                    <OperationTable
                        saveRowStatus={saveRowStatus}
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

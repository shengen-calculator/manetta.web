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
import {HotKeys} from "react-hotkeys";
import {getHandlers, keyMap} from "../../component/KeyMapHandlers";
import {useNavigate} from "react-router-dom";

type RowStatus = {
    id: number
    isValid: boolean
}

type PostDialogStatus = {
    isOpen: boolean
    asSingle: boolean
}

interface OperationsPageProps {
    postOperationsRequest: (params: PostOperationsParams) => PostOperationsAction,
    operation: OperationState
}

const OperationsPage: React.FC<OperationsPageProps> = (
    {
        postOperationsRequest,
        operation
    }
) => {

    const post = (postAsSingle: boolean) => {
        postOperationsRequest({
            postAsSingle: postAsSingle,
            ids: rowStatuses.filter(st => st.isValid).map(rs => rs.id.toString())
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

    const navigate = useNavigate();

    const nonZeroOperations = [...operation.items].filter(opr => opr.sum);

    const dialog = (asSingle: boolean) => {
        const disabled = rowStatuses.some(rs => !rs.isValid) || nonZeroOperations.length === 0;
        if (!disabled) {
            setPostDialogStatus({
                isOpen: true,
                asSingle
            })
        }
    };

    const panelButtons: PanelButton[] = [{
        btnText: "POST",
        tooltip: "Hot key: Alt (option) + P",
        isMarked: false,
        disabled: rowStatuses.some(rs => !rs.isValid) || nonZeroOperations.length === 0,
        onClick: () => setPostDialogStatus({
            isOpen: true,
            asSingle: false
        })
    }, {
        btnText: "POST AS SINGLE",
        tooltip: "Hot key: Alt (option) + L",
        isMarked: false,
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

    const saveRowStatus = (id: number, isValid: boolean) => {
        setRowStatuses((prev) => [
            ...prev.filter(rs => rs.id !== id),
            {
                id,
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
                <HotKeys handlers={getHandlers(navigate, dialog)} keyMap={keyMap}>
                    <Header title="MANETTA" menuItems={menuItems}/>
                    <main>
                        <ButtonPanel buttons={panelButtons}/>
                        <OperationTable
                            saveRowStatus={saveRowStatus}
                        />
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
        operation: state.operation
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

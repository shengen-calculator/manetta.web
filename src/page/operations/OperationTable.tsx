import * as React from 'react';
import {useEffect} from "react";
import {connect} from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import OperationTableRow from "./OperationTableRow";
import {
    AccountState,
    ApplicationState,
    OperationState
} from "../../redux/reducers/types";
import {
    CreateOperationAction,
    createOperationRequest,
    GetOperationsAction,
    getOperationsRequest,
    UpdateOperationAction,
    updateOperationRequest
} from "../../redux/actions/operationActions";
import {GetAccountsAction, getAccountsRequest} from "../../redux/actions/accountActions";
import {GetGroupsAction, getGroupsRequest} from "../../redux/actions/groupActions";
import {GetTagsAction, getTagsRequest} from "../../redux/actions/tagActions";
import OperationHelper from "../../util/OperationHelper";
import TagDialog from "./TagDialog";

interface OperationTableProps {
    createOperationRequest: (params: CreateOperationParams) => CreateOperationAction
    updateOperationRequest: (params: UpdateOperationParams) => UpdateOperationAction
    getOperationsRequest: () => GetOperationsAction
    getAccountsRequest: () => GetAccountsAction
    getGroupsRequest: () => GetGroupsAction
    getTagsRequest: () => GetTagsAction
    saveRowStatus: (key: number, isValid: boolean) => void
    operations: OperationState
    accounts: AccountState
    allTags: string[]
    groups: Group[]
}

type TagDialogStatus = {
    tagDialogParams: TagDialogParams
    isOpen: boolean
}

const OperationTable: React.FC<OperationTableProps> = (
    {
        createOperationRequest,
        updateOperationRequest,
        getOperationsRequest,
        getAccountsRequest,
        getGroupsRequest,
        getTagsRequest,
        saveRowStatus,
        operations,
        accounts,
        allTags,
        groups,
    }
) => {
    let isDataRequested = false;

    useEffect(() => {
        if (!isDataRequested) {
            isDataRequested = true;
            getOperationsRequest();
            getAccountsRequest();
            getGroupsRequest();
            getTagsRequest();
        }
    }, []);

    useEffect(() => {
        if(operations.isLoaded && accounts.items.length) {
            const zeroOperation = operations.items.filter(oi => oi.sum === 0);
            if(!zeroOperation.length) {
                createOperationRequest({
                    id: undefined,
                    date: OperationHelper.getActualDate(operations.items),
                    account: OperationHelper.getActualAccount(operations.items, accounts.items),
                    group: "",
                    created: 0,
                    description: "",
                    sum: 0,
                    tags: []
                })
            }
        }
    }, [operations, accounts]);

    const [tagDialogStatus, setTagDialogStatus] = React.useState<TagDialogStatus>({
        tagDialogParams: {
            operationId: 0,
            tags: [],
            groupName: ""
        },
        isOpen: false
    });

    const saveTags = (tagDialogParams: TagDialogParams) => {
        console.log(`Save tags params: ${JSON.stringify(tagDialogParams)}`);
        setTagDialogStatus({
            ...tagDialogStatus,
            isOpen: false
        });
    };

    const openTagDialog = (tagDialogParams: TagDialogParams) => {
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

    const save = ((operation: Operation): void => {
        const date = new Date(operation.date);
        const operationParams = {
            ...operation,
            date: date.toISOString().slice(0, 10),
            sum: Math.round(operation.sum * 100)
        };
        updateOperationRequest(operationParams);
    });

    const rows = [...operations.items];
    rows.sort((a, b) => a.created - b.created);

    return (
        <TableContainer component={Paper}>
            <TagDialog
                isOpen={tagDialogStatus.isOpen}
                onCancel={handleTagDialogCancel}
                groups={groups}
                tags={allTags}
                tagDialogParams={tagDialogStatus.tagDialogParams}
                save={saveTags}
            />
            <Table sx={{minWidth: 450}} aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <OperationTableRow
                            key={row.id}
                            operation={row}
                            accounts={accounts.items}
                            groups={groups}
                            save={save}
                            saveRowStatus={saveRowStatus}
                            tagDialogOpen={openTagDialog}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        operations: state.operations,
        accounts: state.accounts,
        groups: state.groups,
        allTags: state.tags,
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    createOperationRequest,
    updateOperationRequest,
    getOperationsRequest,
    getAccountsRequest,
    getGroupsRequest,
    getTagsRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationTable)


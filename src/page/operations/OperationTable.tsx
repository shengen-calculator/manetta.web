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
    ApplicationState, GroupState,
    OperationState, TagState
} from "../../redux/reducers/types";
import {
    CreateOperationAction,
    createOperationRequest,
    DeleteOperationAction,
    deleteOperationRequest,
    GetOperationsAction,
    getOperationsRequest,
    UpdateOperationAction,
    updateOperationRequest
} from "../../redux/actions/operationActions";
import {GetAccountsAction, getAccountsRequest} from "../../redux/actions/accountActions";
import {
    CreateGroupAction,
    createGroupRequest,
    GetGroupsAction,
    getGroupsRequest,
    UpdateGroupAction,
    updateGroupRequest
} from "../../redux/actions/groupActions";
import {GetTagsAction, getTagsRequest} from "../../redux/actions/tagActions";
import OperationHelper from "../../util/OperationHelper";
import TagDialog from "./TagDialog";

interface OperationTableProps {
    createOperationRequest: (params: CreateOperationParams) => CreateOperationAction
    updateOperationRequest: (params: UpdateOperationParams) => UpdateOperationAction
    deleteOperationRequest: (params: DeleteOperationParams) => DeleteOperationAction
    getOperationsRequest: () => GetOperationsAction
    getAccountsRequest: () => GetAccountsAction
    createGroupRequest: (params: CreateGroupParams) => CreateGroupAction
    updateGroupRequest: (params: UpdateGroupParams) => UpdateGroupAction
    getGroupsRequest: () => GetGroupsAction
    getTagsRequest: () => GetTagsAction
    saveRowStatus: (key: number, isValid: boolean) => void
    operations: OperationState
    account: AccountState
    tag: TagState
    group: GroupState
}

type TagDialogStatus = {
    operationId: number,
    tags: string[],
    groupName: string
    isOpen: boolean
}

const OperationTable: React.FC<OperationTableProps> = (
    {
        createOperationRequest,
        updateOperationRequest,
        deleteOperationRequest,
        getOperationsRequest,
        getAccountsRequest,
        createGroupRequest,
        updateGroupRequest,
        getGroupsRequest,
        getTagsRequest,
        saveRowStatus,
        operations,
        account,
        tag,
        group,
    }
) => {
    let initStatus: InitStatus = "NOT_STARTED";

    useEffect(() => {
        if (initStatus === "NOT_STARTED") {
            getOperationsRequest();
            if (account.status === "NOT_DEFINED") {
                getAccountsRequest();
            }
            if (group.status === "NOT_DEFINED") {
                getGroupsRequest();
            }
            if (tag.status === "NOT_DEFINED") {
                getTagsRequest();
            }
            initStatus = "STARTED";
        }
        if (group.status === "DEFINED" && tag.status === "DEFINED" && account.status === "DEFINED") {
            initStatus = "FINISHED";
        }
    }, [group.status, tag.status, account.status]);

    useEffect(() => {
        if(operations.isLoaded && account.items.length) {
            const zeroOperation = operations.items.filter(oi => oi.sum === 0);
            if(!zeroOperation.length) {
                createOperationRequest({
                    id: undefined,
                    date: OperationHelper.getActualDate(operations.items),
                    account: OperationHelper.getActualAccount(operations.items, account.items),
                    group: "",
                    created: 0,
                    description: "",
                    sum: 0,
                    tags: []
                })
            }
        }
    }, [operations, account]);

    const [tagDialogStatus, setTagDialogStatus] = React.useState<TagDialogStatus>({
        operationId: 0,
        tags: [],
        groupName: "",
        isOpen: false
    });

    const saveTags = (operationId: number, tags: string[], groupName: string, saveAsGroup: boolean) => {
        handleTagDialogCancel();
        const operation = operations.items.find(o => o.id === operationId);
        if (operation) {
            save({
                id: operationId,
                date: operation.date,
                account: operation.account,
                group: groupName,
                created: operation.created,
                description: operation.description,
                sum: operation.sum,
                tags: tags
            });
        }
        if (saveAsGroup) {
            const groupItem = group.items.find(el => el.name === groupName);
            if (groupItem && groupItem.tags !== tags) {
                updateGroupRequest({
                    name: groupName,
                    tags
                })
            }
            if (!groupItem && groupName) {
                createGroupRequest({
                    name: groupName,
                    tags
                })
            }
        }
    };

    const openTagDialog = (operationId: number, tags: string[], groupName: string) => {
        setTagDialogStatus({
            ...tagDialogStatus,
            operationId,
            tags,
            groupName,
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
                groups={group.items}
                allTags={tag.items}
                operationId={tagDialogStatus.operationId}
                tags={tagDialogStatus.tags}
                groupName={tagDialogStatus.groupName}
                save={saveTags}
            />
            <Table sx={{minWidth: 450}} aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <OperationTableRow
                            key={row.id}
                            operation={row}
                            accounts={account.items}
                            groups={group.items}
                            save={save}
                            saveRowStatus={saveRowStatus}
                            tagDialogOpen={openTagDialog}
                            deleteRowClick={deleteOperationRequest}
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
        account: state.account,
        group: state.group,
        tag: state.tag
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    createOperationRequest,
    updateOperationRequest,
    deleteOperationRequest,
    getOperationsRequest,
    getAccountsRequest,
    createGroupRequest,
    updateGroupRequest,
    getGroupsRequest,
    getTagsRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationTable)


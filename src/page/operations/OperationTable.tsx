import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import OperationTableRow from "./OperationTableRow";
import {AccountState, ApplicationState, OperationState} from "../../redux/reducers/types";
import {
    CreateOperationAction,
    createOperationRequest, GetOperationsAction,
    getOperationsRequest, UpdateOperationAction,
    updateOperationRequest
} from "../../redux/actions/operationActions";
import {GetAccountsAction, getAccountsRequest} from "../../redux/actions/accountActions";
import {GetGroupsAction, getGroupsRequest} from "../../redux/actions/groupActions";
import {connect} from "react-redux";
import {useEffect} from "react";
import OperationHelper from "../../util/OperationHelper";

interface OperationTableProps {
    createOperationRequest: (params: CreateOperationParams) => CreateOperationAction
    updateOperationRequest: (params: UpdateOperationParams) => UpdateOperationAction
    getOperationsRequest: () => GetOperationsAction
    getAccountsRequest: () => GetAccountsAction
    getGroupsRequest: () => GetGroupsAction
    saveRowStatus: (key: number, isValid: boolean) => void
    tagDialogOpen: (tagDialogParams: TagDialogParams) => void
    operations: OperationState
    accounts: AccountState
    groups: Group[]
}

const OperationTable: React.FC<OperationTableProps> = (
    {
        createOperationRequest,
        updateOperationRequest,
        getOperationsRequest,
        getAccountsRequest,
        getGroupsRequest,
        saveRowStatus,
        tagDialogOpen,
        operations,
        accounts,
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
                            tagDialogOpen={tagDialogOpen}
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
        groups: state.groups
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    createOperationRequest,
    updateOperationRequest,
    getOperationsRequest,
    getAccountsRequest,
    getGroupsRequest,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationTable)


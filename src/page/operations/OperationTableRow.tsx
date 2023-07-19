import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Dayjs} from "dayjs";
import {Badge} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import TableTextInput from "./TableTextInput";
import TableCurrencyInput from "./TableCurrencyInput";
import TableDateInput from "./TableDateInput";
import {useEffect} from "react";

interface OperationTableRowProps {
    saveRowStatus: (key: number, isValid: boolean) => void
    tagDialogOpen: (operationId: number, tags: string[], groupName: string) => void
    operation: Operation
    accounts: Account[]
    groups: Group[]
    save: (operation: Operation) => void
}

interface OperationRow extends Operation{
    inputGroup: string,
    inputAccount: string
}

type RowError = {
    isDateValid: boolean,
    isAccountValid: boolean,
    isGroupValid: boolean,
    isSumValid: boolean
}

const OperationTableRow: React.FC<OperationTableRowProps> = (
    {
        saveRowStatus,
        tagDialogOpen,
        operation,
        accounts,
        groups,
        save
    }
) => {
    const maxDate = '2030-12-31';
    const minDate = '2020-01-01';

    const [operationRow, setOperationRow] = useState<OperationRow>({
        id: operation.id,
        date: operation.date,
        account: operation.account,
        created: operation.created,
        group: operation.group,
        description: operation.description,
        sum: operation.sum,
        tags: operation.tags,
        inputGroup: "",
        inputAccount: ""
    });

    useEffect(() => {
        if (operationRow.sum !== 0) {
            saveRowStatus(operationRow.id, true);
        }
    }, []);

    useEffect(() => {
        setOperationRow(prev => ({
            ...prev,
            tags: operation.tags,
            group: operation.group
        }));
    }, [operation.tags, operation.group]);

    const handleTagDialogOpen = (): void => {
        tagDialogOpen(operationRow.id, operationRow.tags, operationRow.group);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        setOperationRow(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (value: Dayjs | null, name: string): void => {
        setOperationRow(prev => ({
            ...prev,
            [name]: (value && value.isValid()) ? value.valueOf() : null
        }));
    };

    const handleAutocompleteChange = (event: React.SyntheticEvent, newValue: string | null, inputId: string): void => {
        setOperationRow(prev => ({
            ...prev,
            [inputId]: newValue
        }));

        if (inputId !== "group") {
            return;
        }
        const group = groups.find(gr => gr.name === newValue);
        setOperationRow(prev => ({
            ...prev,
            tags: group ? group.tags : []
        }));
    };

    const [errors, setErrors] = useState<RowError>({
        isDateValid: true,
        isAccountValid: true,
        isGroupValid: true,
        isSumValid: true
    });

    const isOperationValid = (): boolean => {
        const startDate = new Date(minDate);
        const endDate = new Date(maxDate);
        const rowError = {
            isAccountValid: !!operationRow.account,
            isGroupValid: !!operationRow.group,
            isSumValid: operationRow.sum != 0 &&
                operationRow.sum > -100000000 &&
                operationRow.sum < 100000000,
            isDateValid: operationRow.date >= startDate.setUTCHours(0,0,0,0) &&
                operationRow.date <= endDate.setUTCHours(23,59,59,999)
        };
        setErrors(rowError);
        const isValid = rowError.isAccountValid &&
            rowError.isGroupValid &&
            rowError.isSumValid &&
            rowError.isDateValid;
        saveRowStatus(operationRow.id, isValid);
        return isValid;
    };

    const isOperationUpdated = (): boolean => {
            return operation.date !== operationRow.date ||
            operation.account !== operationRow.account ||
            operation.sum !== Number(operationRow.sum) ||
            operation.description !== operationRow.description ||
            operation.group !== operationRow.group ||
            operation.tags !== operationRow.tags;
    };

    const handleFocusLost = (event: React.SyntheticEvent): void => {
        if(operationRow.sum === 0) {
            return;
        }
        if (isOperationUpdated() && isOperationValid()) {
            save(operationRow);
        }
    };

    const account = accounts.find(acc => acc. name === operationRow.account);

    return (
        <TableRow onBlur={handleFocusLost} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row">
                <TableDateInput
                    id="date"
                    label="Date operation"
                    width={80}
                    minDate={minDate}
                    maxDate={maxDate}
                    value={operationRow.date}
                    onChange={(val) => {
                        handleDateChange(val, "date")
                    }}
                />
            </TableCell>
            <TableCell align="right">
                <AutoCompleteInput
                    id="account"
                    label="Account"
                    options={accounts.map(acc => acc.name)}
                    width={160}
                    error={!errors.isAccountValid}
                    value={operationRow.account}
                    inputValue={operationRow.inputAccount}
                    onChange={(e, newVal) => handleAutocompleteChange(e, newVal, "account")}
                    onInputChange={(e, newVal) => handleAutocompleteChange(e, newVal, "inputAccount")}
                />
            </TableCell>
            <TableCell align="right">
                <AutoCompleteInput
                    id="group"
                    label="Group"
                    options={groups.map(gr => gr.name)}
                    width={200}
                    error={!errors.isGroupValid}
                    value={operationRow.group || ''}
                    inputValue={operationRow.inputGroup}
                    onChange={(e, newVal) => handleAutocompleteChange(e, newVal, "group")}
                    onInputChange={(e, newVal) => handleAutocompleteChange(e, newVal, "inputGroup")}
                />
            </TableCell>
            <TableCell align="right">
                <TableTextInput
                    id="description"
                    label="Description"
                    width={300}
                    value={operationRow.description}
                    onChange={handleChange}
                />
            </TableCell>
            <TableCell align="right">
                <TableCurrencyInput
                    id="sum"
                    label="Amount"
                    error={!errors.isSumValid}
                    width={100}
                    value={operationRow.sum}
                    currency={account ? account.currency : ""}
                    onChange={handleChange}
                />
            </TableCell>
            <TableCell align="right">
                <Badge badgeContent={operationRow.tags.length} color="primary">
                    <IconButton
                        aria-label="operation tags"
                        component="label"
                        onClick={handleTagDialogOpen}
                    >
                        <BookmarksIcon/>
                    </IconButton>
                </Badge>
            </TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" component="label" color="error" disabled={operationRow.sum === 0}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
};
export default OperationTableRow;

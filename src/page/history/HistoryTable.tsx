import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box} from "@mui/material";
import EnhancedTableHead from "../../component/EnhancedTableHead";
import headCells from "./headCells";
import {deepOrange, yellow} from "@mui/material/colors";
import {currencies} from "../../util/currencies";

interface HistoryTableProps {
    rows: Array<PostedOperation>
    accounts: Array<Account>
    handleOpenRevertDialog: (operation: PostedOperation) => void
}

const HistoryTable: React.FC<HistoryTableProps> = (
    {
        rows,
        accounts,
        handleOpenRevertDialog
    }
) => {

    const handleClick = (event: React.MouseEvent<unknown>, operation: PostedOperation) => {
        handleOpenRevertDialog(operation);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size='small'
                    >
                        <EnhancedTableHead headCells={headCells}/>
                        <TableBody>
                            {rows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const sx = row.isRevertOperation || row.isReverted ?
                                    {
                                        backgroundColor: row.isReverted ? deepOrange[50] : yellow[50]
                                    } :
                                    {
                                        cursor: 'pointer'
                                    };
                                let rowCurrency;
                                const account = accounts.find(acc => acc.name === row.account);
                                if (account) {
                                    rowCurrency = currencies.find(cur => cur.value === account.currency);
                                }
                                return (
                                    <TableRow
                                        hover={!row.isRevertOperation && !row.isReverted}
                                        onClick={(event) => handleClick(event, row)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.created}
                                        sx={sx}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            sx={{pl: 2}}
                                        >
                                            {new Date(row.date).toISOString().slice(0, 10)}
                                        </TableCell>
                                        <TableCell align="left">{row.account}</TableCell>
                                        <TableCell align="left">
                                            {`${row.tags[row.tags.length - 1]} ${row.description ? "->" : ""} ${row.description}`}
                                        </TableCell>
                                        <TableCell align="right">{row.docNumber}</TableCell>
                                        <TableCell align="right">
                                            {`${rowCurrency ? rowCurrency.label : ""}${row.sum}`}
                                        </TableCell>
                                        <TableCell align="right">€{row.equivalent}</TableCell>
                                        <TableCell align="right">
                                            {`${rowCurrency ? rowCurrency.label : ""}${row.balance}`}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default HistoryTable;


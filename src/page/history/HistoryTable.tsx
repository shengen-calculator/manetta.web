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

interface HistoryTableProps {
    rows: Array<PostedOperation>
}

const HistoryTable: React.FC<HistoryTableProps> = (
    {
        rows,
    }
) => {

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        console.log("Rollback transaction => " + name);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='small'
                    >
                        <EnhancedTableHead headCells={headCells}/>
                        <TableBody>
                            {rows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.date)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ cursor: 'pointer' }}
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
                                        <TableCell align="right">₴{row.sum}</TableCell>
                                        <TableCell align="right">€{row.equivalent}</TableCell>
                                        <TableCell align="right">₴{row.balance}</TableCell>
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


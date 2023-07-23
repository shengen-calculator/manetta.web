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

function createData(
    date: string,
    account: string,
    description: string,
    docNumber: number,
    sum: number,
    equivalent: number,
    balance: number
) {
    return {date, account, description, docNumber, sum, equivalent, balance};
}

const rows = [
    createData('12/02/2023', "OTP-BLACK", "Dastor: Some small desc", 1, 6.0, 24, 4.0),
    createData('14/02/2023', "OTP-BLACK", "Restaurant: Some bigger description", 2, 9.0, 37, 4.3),
    createData('16/02/2023', "OTP-BLACK", "Shtefanyo: Just a few words", 3, 16.0, 24, 6.0),
    createData('19/02/2023', "PRIVAT-EUR", "Medicine: interesting book", 4, 3.7, 67, 4.3),
    createData('23/02/2023', "MONO-EUR", "Silpo: ", 5, 16.0, 49, 3.9),
];


const HistoryTable = () => {
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        alert("Rollback transaction => " + name);
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
                                        key={row.date}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            sx={{pl: 2}}
                                        >
                                            {row.date}
                                        </TableCell>
                                        <TableCell align="left">{row.account}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
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

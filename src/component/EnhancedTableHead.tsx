import * as React from "react";
import {TableHead} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

interface EnhancedTableProps {
    headCells: Array<HeadCell>
}


const EnhancedTableHead: React.FC<EnhancedTableProps> = ({
                                                             headCells
                                                         }) => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;

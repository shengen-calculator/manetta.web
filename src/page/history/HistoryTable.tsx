import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box } from "@mui/material";
import EnhancedTableHead from "../../component/EnhancedTableHead";
import headCells from "./headCells";
import { deepOrange, yellow, green} from "@mui/material/colors";
import { currencies } from "../../util/currencies";
import { Tooltip } from "@mui/material";

interface HistoryTableProps {
  rows: Array<PostedOperation>;
  accounts: Array<Account>;
  selected: Array<number>;
  onRowClick: (operation: PostedOperation) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  rows,
  accounts,
  selected,
  onRowClick,
}) => {
  const onClick = (
    event: React.MouseEvent<unknown>,
    operation: PostedOperation,
  ) => {
    onRowClick(operation);
  };
  const isRowSelected = (id: number) => ~selected.indexOf(id);
  const getRowStyle = (row: PostedOperation) => {
    if(row.isRevertOperation) {
      return {
        backgroundColor: yellow[50]
      }
    } else if(row.isReverted) {
      return {
        backgroundColor: deepOrange[50]
      }
    } else if(isRowSelected(row.id)) {
      return {
        backgroundColor: green[50],
        cursor: "pointer"
      }
    }
    return {
      cursor: "pointer"
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                let rowCurrency;
                const account = accounts.find(
                  (acc) => acc.name === row.account,
                );
                if (account) {
                  rowCurrency = currencies.find(
                    (cur) => cur.value === account.currency,
                  );
                }
                return (
                  <TableRow
                    hover={!row.isRevertOperation && !row.isReverted && !isRowSelected(row.id)}
                    onClick={(event) => onClick(event, row)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.created}
                    sx={getRowStyle(row)}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ pl: 2 }}
                    >
                      {new Date(row.date).toISOString().slice(0, 10)}
                    </TableCell>
                    <TableCell align="left">{row.account}</TableCell>
                    <TableCell align="left">
                      <Tooltip title={row.tags.join(" => ")}>
                        <span>{`${row.tags[row.tags.length - 1]} `}</span>
                      </Tooltip>
                      {`${row.description ? "->" : ""} ${row.description}`}
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

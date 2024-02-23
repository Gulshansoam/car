import { Skeleton, TableCell, TableRow } from "@mui/material";
export const TableRowsLoader = ({ rowsNum, colunmNum }) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      {[...Array(colunmNum)].map((col, colindex) => (
        <TableCell>
          <Skeleton animation={"wave"} />
          {/* <Skeleton className="h-3.5 bg-gray-400" /> */}
        </TableCell>
      ))}
    </TableRow>
  ));
};

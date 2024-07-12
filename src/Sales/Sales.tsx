import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Paper,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

// Define styled components with responsive styles
const StyledTableContainer = styled(TableContainer)`
  th {
    color:white;
  }
  table tr td{
    color:white;
  }
  table thead,
  table tr
  {
    border-left: 1px solid rgba(224, 224, 224, 1);
    border-left-width: 1px;
    border-left-style: solid;
    border-left-color: rgb(224, 224, 224);


    border-right: 1px solid rgba(224, 224, 224, 1);
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: rgb(224, 224, 224);
  } 
    
   table thead{
    border-top: 1px solid rgba(224, 224, 224, 1);
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(224, 224, 224);
}
`;

const StyledTableRow = styled(TableRow)`
  & > .MuiTableCell-root {
    padding: 8px;
  }
  @media (max-width: 600px) {
    & > .MuiTableCell-root {
      padding: 4px;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 8px;
  color: white !important;
  @media (max-width: 600px) {
    padding: 4px;
  }
`;

const StyledBox = styled(Box)`
  margin: 1;
  @media (max-width: 600px) {
    margin: 0.5;
  }
  .prev-history{
  display:flex;
    flex-direction: row;
    justify-content: space-between;
  align-items: end;
  }  
`;

interface RowData {
  date: string;
  newPrice: number;
  oldPrice: number;
  cashPaid: number;
  history: {weight: Array<{
    item: string;
    itemType: string;
    weight: number;
    touch: number;
  }>,
  cash: Array<{
    item: string;
    itemType: string;
    weight?: number;
    PerKg?: number;
    value?: number;
  }>
}
};

function createData(
  date: string,
  newPrice: number,
  oldPrice: number,
  cashPaid: number,
 
): RowData {
  return {
    date,
    newPrice,
    oldPrice,
    cashPaid,
    history: { weight: [
      { item: 'New', weight: 23.000, touch: 78,itemType: 'New'  },
      { item: 'Old', weight: 10.000, touch: 54, itemType: 'Old' },
    ],
    cash: [
      { item: 'MC', weight: 23.000, PerKg: 300,itemType: 'MC'  },
      { item: 'Cash Paid', weight: 23.000, PerKg: 300,itemType: 'Cash Paid', value: 20000  },
      { item: 'Rate Cutting', weight: 3.000, PerKg: 90000,itemType: 'Rate Cutting'  },
    ]},
  };
}

const rows: RowData[] = [
  createData('2022-01-01', 305, 67, 4.3),
  createData('2022-02-01', 452, 51, 4.9),
  createData('2022-03-01', 262, 24, 6.0),
  createData('2022-04-01', 159, 24, 4.0),
  createData('2022-05-01', 356, 49, 3.9),
];

interface RowProps {
  row: RowData;
  isOpen: boolean;
  toggleOpen: (date: string) => void;
}

const Row: React.FC<RowProps> = React.memo(function Row({ row, isOpen, toggleOpen }) {
    console.log("re rendered memo row", row)
  return (
    <React.Fragment>
      <StyledTableRow>
        <TableCell>
          <StyledIconButton
            aria-label="expand row"
            size="small"
            onClick={() => toggleOpen(row.date)}
          >
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </StyledIconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.newPrice}</TableCell>
        <TableCell align="right">{row.oldPrice}</TableCell>
        <TableCell align="right">{row.cashPaid}</TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <StyledBox>
            <Box className="prev-history">
             <div className="history-prev-silver" >Prev Silver Balance: 123.450 </div>
             <div className="history-prev-cash">Prev Cash Balance: 123111.450</div>
            </Box>
              <h6 className="history-div">Weight Details</h6>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell align="right">Touch</TableCell>
                    <TableCell align="right">Net Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.weight.map((historyRow) => (
                    <TableRow key={historyRow.item}>
                      <TableCell component="th" scope="row">
                        {historyRow.item}
                      </TableCell>
                      <TableCell>{historyRow.weight}</TableCell>
                      <TableCell align="right">{historyRow.touch}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.weight * historyRow.touch) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledBox>
            <StyledBox>
           
              <h6 className="history-div">Cash Details</h6>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Description Type</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell align="right">Price Per Kg</TableCell>
                    <TableCell align="right">Effected Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.cash.map((historyRow) => (
                    <TableRow key={historyRow.item}>
                      <TableCell component="th" scope="row">
                        {historyRow.item}
                      </TableCell>
                      <TableCell>{historyRow.weight ?? "--"}</TableCell>
                      <TableCell align="right">{historyRow.PerKg?? "--"}</TableCell>
                      <TableCell align="right">
                        {(historyRow.value ?? '--' ) }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledBox>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
});

const CollapsibleTable: React.FC = () => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const toggleOpen = useCallback((date: string) => {
    setOpenRows((prev) => ({ ...prev, [date]: !prev[date] }));
  }, []);

  const memoizedRows = useMemo(() => {
    console.log("memoizedRows")
    return rows.map((row) => (
      <Row
        key={row.date}
        row={row}
        isOpen={!!openRows[row.date]}
        toggleOpen={toggleOpen}
      />
    ));
  }, [openRows, toggleOpen]);

  return (
    <StyledTableContainer >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="right">New</TableCell>
            <TableCell align="right">Old</TableCell>
            <TableCell align="right">Cash Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{memoizedRows}</TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default CollapsibleTable;

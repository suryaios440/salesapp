import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

// Define styled components with responsive styles
const StyledTableContainer = styled(TableContainer)`
  th {
    color: white;
  }
  table tr td {
    color: white;
  }
  table thead,
  table tr {
    border-left: 1px solid rgba(224, 224, 224, 1);
    border-right: 1px solid rgba(224, 224, 224, 1);
  }
  table thead {
    border-top: 1px solid rgba(224, 224, 224, 1);
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

const StyledButton = styled(Button)`
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
  .prev-history {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    color: black;
  }
  .history-div{
    color: black;
  }  
`;
const ModalHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  background-color: #f1f1f1;
`;

const ModalHeaderTop = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-details{
    color:black;
  }

`;

const ModalHeaderBottom = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`;
const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 16px); // 8px gap on each side
  max-width: 800px;
  height: calc(100% - 16px); // 8px gap on each side
  max-height: calc(100% - 16px); // Ensure modal fits within the viewport with gap
  background-color: white;
  border: 2px solid #000;
  box-shadow: 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    width: calc(100% - 16px); // 8px gap on each side
    height: calc(100% - 16px); // 8px gap on each side
  }
`;

const ModalBody = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  color: black;
`;

const ModalFooter = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #ddd;
  background-color: #f1f1f1;
`;




interface RowData {
  date: string;
  newPrice: number;
  oldPrice: number;
  cashPaid: number;
  history: {
    weight: Array<{
      item: string;
      itemType: string;
      weight: number;
      touch: number;
    }>;
    cash: Array<{
      item: string;
      itemType: string;
      weight?: number;
      PerKg?: number;
      value?: number;
    }>;
  };
}

function createData(date: string, newPrice: number, oldPrice: number, cashPaid: number): RowData {
  return {
    date,
    newPrice,
    oldPrice,
    cashPaid,
    history: {
      weight: [
        { item: 'New', weight: 23.0, touch: 78, itemType: 'New' },
        { item: 'Old', weight: 10.0, touch: 54, itemType: 'Old' },
      ],
      cash: [
        { item: 'MC', weight: 23.0, PerKg: 300, itemType: 'MC' },
        { item: 'Cash Paid', weight: 23.0, PerKg: 300, itemType: 'Cash Paid', value: 20000 },
        { item: 'Rate Cutting', weight: 3.0, PerKg: 90000, itemType: 'Rate Cutting' },
      ],
    },
  };
}

const rows: RowData[] = [
  createData('2022-01-01', 305, 67, 4.3),
  createData('2022-02-01', 452, 51, 4.9),
  createData('2022-03-01', 262, 24, 6.0),
  createData('2022-04-01', 159, 24, 4.0),
  createData('2022-05-01', 356, 49, 3.9),
];

const SalesDetails: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  
    const handleOpenModal = (row: RowData) => {
      setSelectedRow(row);
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedRow(null);
    };
  
    return (
      <StyledTableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">New</TableCell>
              <TableCell align="right">Old</TableCell>
              <TableCell align="right">Cash Paid</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.newPrice}</TableCell>
                <TableCell align="right">{row.oldPrice}</TableCell>
                <TableCell align="right">{row.cashPaid}</TableCell>
                <TableCell align="right">
                  <InfoIcon onClick={() => handleOpenModal(row)} />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
  
        <Modal open={openModal} onClose={handleCloseModal}>
          <ModalContent>
            {selectedRow && (
              <>
                <ModalHeader>
                  <ModalHeaderTop>
                    <Typography variant="h6">Details for {selectedRow.date}</Typography>
                    <IconButton onClick={handleCloseModal}>
                      <CloseIcon />
                    </IconButton>
                  </ModalHeaderTop>
                  <ModalHeaderBottom>
                    <div>Prev Silver Balance: {selectedRow.history.weight.reduce((sum, item) => sum + item.weight, 0).toFixed(3)}</div>
                    <div>Prev Cash Balance: {selectedRow.history.cash.reduce((sum, item) => sum + (item.value ?? 0), 0).toFixed(3)}</div>
                  </ModalHeaderBottom>
                </ModalHeader>
                <ModalBody>
                  <StyledBox>
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
                        {selectedRow.history.weight.map((historyRow) => (
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
                        {selectedRow.history.cash.map((historyRow) => (
                          <TableRow key={historyRow.item}>
                            <TableCell component="th" scope="row">
                              {historyRow.item}
                            </TableCell>
                            <TableCell>{historyRow.weight ?? '--'}</TableCell>
                            <TableCell align="right">{historyRow.PerKg ?? '--'}</TableCell>
                            <TableCell align="right">{historyRow.value ?? '--'}</TableCell>
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
                        {selectedRow.history.cash.map((historyRow) => (
                          <TableRow key={historyRow.item}>
                            <TableCell component="th" scope="row">
                              {historyRow.item}
                            </TableCell>
                            <TableCell>{historyRow.weight ?? '--'}</TableCell>
                            <TableCell align="right">{historyRow.PerKg ?? '--'}</TableCell>
                            <TableCell align="right">{historyRow.value ?? '--'}</TableCell>
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
                        {selectedRow.history.cash.map((historyRow) => (
                          <TableRow key={historyRow.item}>
                            <TableCell component="th" scope="row">
                              {historyRow.item}
                            </TableCell>
                            <TableCell>{historyRow.weight ?? '--'}</TableCell>
                            <TableCell align="right">{historyRow.PerKg ?? '--'}</TableCell>
                            <TableCell align="right">{historyRow.value ?? '--'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </StyledBox>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleCloseModal} color="primary" variant="contained">
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </StyledTableContainer>
    );
  };
  
  export default SalesDetails;
  


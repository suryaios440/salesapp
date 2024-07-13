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
  Modal,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ModalContentComponent from '../Sale/SaleDetailsInModal/SaleDetailsInModal';



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

const CustomerSalesDetails: React.FC = () => {
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
        <Box>
          {selectedRow && (
            <ModalContentComponent
              date={selectedRow.date}
              weight={selectedRow.history.weight.reduce((sum, item) => sum + item.weight, 0)}
              cash={selectedRow.history.cash.reduce((sum, item) => sum + (item.value ?? 0), 0)}
              weightHistory={selectedRow.history.weight}
              cashHistory={selectedRow.history.cash}
              onClose={handleCloseModal}
            />
          )}
        </Box>
      </Modal>
    </StyledTableContainer>
  );
};

export default CustomerSalesDetails;

import React from 'react';
import { Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import styled from 'styled-components';

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
  .history-div {
    color: black;
  }
`;

const ModalBodyContainer = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  color: black;
`;

interface ModalBodyComponentProps {
  weightHistory: Array<{
    item: string;
    itemType: string;
    weight: number;
    touch: number;
  }>;
  cashHistory: Array<{
    item: string;
    itemType: string;
    weight?: number;
    PerKg?: number;
    value?: number;
  }>;
}

const ViewSaleModalContent: React.FC<ModalBodyComponentProps> = ({ weightHistory, cashHistory }) => {
  return (
    <ModalBodyContainer>
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
            {weightHistory.map((historyRow) => (
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
            {cashHistory.map((historyRow) => (
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
    </ModalBodyContainer>
  );
};

export default ViewSaleModalContent;

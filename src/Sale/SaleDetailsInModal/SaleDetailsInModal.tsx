import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import ViewSaleModalContent from './ViewSaleModalContent';
import EditSales from '../EditSales/EditSales';


const ModalHeaderContainer = styled(Box)`
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
  .header-details {
    color: black;
  }
`;

const ModalHeaderBottom = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`;

const ModalFooterContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #ddd;
  background-color: #f1f1f1;
`;

const ModalContentContainer = styled(Box)`
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
     .add-old-weight
  {
    margin-top: 15px;
  }
 
  text-align: center;
 
  .new-weight-container,
  .old-weight-container
  {
  border: 1px solid green;
  border-radius: 4px;
  padding: 10px;
  margin-bottom:20px;
  }   
`;



interface ModalContentComponentProps {
  date: string;
  weight: number;
  cash: number;
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
  onClose: () => void;
}

const ModalContentComponent: React.FC<ModalContentComponentProps> = ({
  date,
  weight,
  cash,
  weightHistory,
  cashHistory,
  onClose,
}) => {
  return (
    <ModalContentContainer>
      <ModalHeaderContainer>
        <ModalHeaderTop>
          <Typography variant="h6">Details for {date}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeaderTop>
        <ModalHeaderBottom>
          <div>Prev Silver Balance: {weight.toFixed(3)}</div>
          <div>Prev Cash Balance: {cash.toFixed(3)}</div>
        </ModalHeaderBottom>
      </ModalHeaderContainer>
      <ViewSaleModalContent weightHistory={weightHistory} cashHistory={cashHistory} />
      <EditSales />
      <ModalFooterContainer>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </ModalFooterContainer>
    </ModalContentContainer>
  );
};

export default ModalContentComponent;

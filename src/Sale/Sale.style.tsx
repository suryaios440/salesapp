// src/StyledComponents.tsx
import styled from 'styled-components';
import { Box, Typography, IconButton } from '@mui/material';

export const SaleInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #333;
  color: #fff;
  margin: 10px 0;
  border-radius: 10px;
`;

export const Header = styled(Box)`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const CustomerName = styled(Typography)`
  font-size: 2em;
`;

export const BilledDate = styled(Typography)`
  font-size: 1em;
  color: #aaa;
  margin: 0px;
  margin-top: 7px !important;
`;

export const Controls = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-top: -20px;
`;

export const ExpandButton = styled(IconButton)`
  color: #fff;
  .collapse-icon,
  .expand-icon {
    outline: -webkit-focus-ring-color auto 5px;
    border-radius: 50%;
    color: white;
  }
`;

export const AdditionalInfo = styled(Box)`
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  .add-old-weight
  {
    margin-top: 15px;
  }
  .new-weight-container,
  .old-weight-container
  {
  border: 1px solid green;
  border-radius: 4px;
  padding: 10px;
  margin-bottom:20px;
  }   
`;

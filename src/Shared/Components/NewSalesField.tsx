// src/RateCutting.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Box, Typography, OutlinedInput, InputAdornment, Select, MenuItem } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const NewSale = styled(Box)`
  display: flex;
  position:relative;
  align-items: centre;
  border: 1px solid red;
  padding: 10px;
  border-radius: 4px;
  justify-content: space-between;
 
`;

const NewSaleWrapper = styled.div`
position: relative;
margin-top: 15px;
.cancel-icon
{
position: absolute;
top:-12px;
right:-12px;
z-index:2;
}

`;

const NewSaleLabel = styled(Typography)`
  color: red;
  margin-bottom: 10px;
`;


const NewSaleNetWeightLabel = styled(Typography)`
  color: red;
  margin-bottom: 10px;
  &.label{
  font-size: 0.7rem;
}
   &.label.weight{
  font-size: 1.2rem;
}
`;
const NewSaleNetWeight = styled(Typography)`
  color: red;
  margin-bottom: 10px;
`;

const NewSaleHeader = styled.div`
display: flex;
flex-direction: column;
align-items: end;
`;


const RateCuttingInput = styled(TextField)`
  .MuiOutlinedInput-root{
    padding-right: 0px !important;
  }
  border: 1px solid red;
  width: 50%;
  .touch p{
    color: orange;
    border-left: dotted;
  }
`;

const NewSalesField: React.FC = () => {
  const [currency, setCurrency] = useState('X.78');
  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
  };

  return (
    <NewSaleWrapper>
<CancelIcon className='cancel-icon' />
<NewSale>
      
      <RateCuttingInput label="New Silver Sales" id="outlined-start-adornment" className='new-sale-input'
        InputLabelProps={{
          shrink: true,
        }} 
       
      
        InputProps={{
          
       
       
          endAdornment: <InputAdornment className='touch' position="end">  
          <Select 
            size='small'
            className='item-type'
            value={currency}
            onChange={handleCurrencyChange}
            displayEmpty
            style={{ marginLeft: '8px' }}
          >
            <MenuItem value="X.78">PT</MenuItem>
            <MenuItem value="X.64">KD</MenuItem>
           
          </Select></InputAdornment>
        }} size="small" />
      <NewSaleHeader>
        <NewSaleNetWeightLabel className='label'>= Nt Wht</NewSaleNetWeightLabel>
        <NewSaleNetWeightLabel className='label weight'>3.000kg</NewSaleNetWeightLabel>
      </NewSaleHeader>
    </NewSale>
    </NewSaleWrapper>
  
  )
};

export default NewSalesField;

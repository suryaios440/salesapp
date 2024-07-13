// src/Alarm.tsx
import React, { useState } from 'react';
import { Typography, Box, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { SaleInfo, Header, CustomerName, BilledDate, Controls, ExpandButton, AdditionalInfo } from './Sale.style';
import NewSaleField from '../Shared/Components/NewWeightField';
import CollapsibleTable from '../Sales/NotUsingSales';
import CustomerSalesDetails from '../Sales/CustomerSalesDetails';
import EditSales from './EditSales/EditSales';



interface AlarmProps {
  customerName: string;
  schedule: string;
  enabled: boolean;
}

const Alarm: React.FC<AlarmProps> = ({ customerName, schedule, enabled }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SaleInfo>
      <Header>
        <Box>
          <CustomerName>{customerName}</CustomerName>
          <BilledDate>{schedule}</BilledDate>
        </Box>
        <Controls>

          <ExpandButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLessIcon className='collapse-icon' /> : <ExpandMoreIcon className='expand-icon' />}
          </ExpandButton>
          <Button startIcon={<EditIcon />}>
            Edit
          </Button>
        </Controls>
      </Header>
      {isExpanded && (
        <AdditionalInfo>

{
true && <CustomerSalesDetails />

}
         
          
        </AdditionalInfo>
      )}
    </SaleInfo>
  );
};

const AlarmList: React.FC = () => (
  <Container>
    <Alarm customerName="Surya Teja Gonuguntla" schedule="Saturday" enabled={false} />
    <Alarm customerName="3:50 am" schedule="Not scheduled" enabled={false} />
    <Alarm customerName="6:00 am" schedule="Not scheduled" enabled={false} />
  </Container>
);

export default AlarmList;

import React, { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import NewSalesField from '../../Shared/Components/NewWeightField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IWeightEntry } from '../../models/SalesData';
import EditNewWeights from './EditNewWeights';
import EditOldWeights from './EditOldWeights';



const EditSales: React.FC = () => {
 

  return (
    <>
      <Box className="edit-sales-container">
        <EditNewWeights />
        <EditOldWeights />
      </Box>
          </>
  );
};

export default EditSales;

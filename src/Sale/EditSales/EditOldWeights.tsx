import React, { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import OldSalesField from '../../Shared/Components/OldWeightField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IWeightEntry } from '../../models/SalesData';


const EditOldWeights: React.FC = () => {
  const [OldWeights, setOldWeights] = useState<IWeightEntry[]>([]);
 
  const handleAddOldWeight = () => {
    const OldEntry: IWeightEntry = {
        id: (OldWeights.length + 1).toString(),
        weight: 0,
        wastage: 0,
        touch: 0,
        NetWeight:0
      };
      setOldWeights([...OldWeights, OldEntry]);
  };



  const handleRemoveWeight = (id: string) => {
      setOldWeights(OldWeights.filter(weight => weight.id != id));
  };

  return (
    <>
      <Box className="Old-weight-container">
        <Button variant="outlined" onClick={handleAddOldWeight} startIcon={<AddCircleIcon />}>
          Add Old Weight
        </Button>
        <div>
          {OldWeights.map(item => (
            <OldSalesField key={item.id} weightDetails={item} handleRemoveEntry={handleRemoveWeight}  />
          ))}
        </div>
      </Box>
    </>
  );
};

export default EditOldWeights;

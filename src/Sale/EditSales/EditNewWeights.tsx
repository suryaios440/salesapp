import React, { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import NewSalesField from '../../Shared/Components/NewWeightField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IWeightEntry } from '../../models/SalesData';


const EditNewWeights: React.FC = () => {
  const [newWeights, setNewWeights] = useState<IWeightEntry[]>([]);
 
  const handleAddNewWeight = () => {
    const newEntry: IWeightEntry = {
        id: (newWeights.length + 1).toString(),
        weight: 0,
        wastage: 0,
        touch: 0,
        NetWeight:0
      };
      setNewWeights([...newWeights, newEntry]);
  };



  const handleRemoveWeight = (id: string) => {
      setNewWeights(newWeights.filter(weight => weight.id != id));
  };

  return (
    <>
      <Box className="new-weight-container">
        <Button variant="outlined" onClick={handleAddNewWeight} startIcon={<AddCircleIcon />}>
          Add New Weight
        </Button>
        <div>
          {newWeights.map(item => (
            <NewSalesField key={item.id} weightDetails={item} handleRemoveEntry={handleRemoveWeight}  />
          ))}
        </div>
      </Box>
    </>
  );
};

export default EditNewWeights;

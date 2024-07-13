// src/NewWeightsField.tsx
import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import WeightField from './WeightField';
import CoversField from './CoversField';
import TouchField from './TouchField';
import { IWeightEntry } from '../../models/SalesData';


const NewWeight = styled(Box)`
  display: flex;
  position: relative;
  align-items: center;
  border: 1px solid red;
  padding: 10px;
  border-radius: 4px;
  justify-content: space-between;
`;

const NewWeightWrapper = styled.div`
  position: relative;
  margin-top: 15px;

  .cancel-icon {
    position: absolute;
    top: -12px;
    right: -12px;
    z-index: 2;
    color:grey;
  }
`;

const NewWeightLabel = styled(Typography)`
  color: red;
  margin-bottom: 10px;
`;

const NewWeightNetWeightLabel = styled(Typography)`
  color: red;
  margin-bottom: 10px;

  &.label {
    font-size: 0.7rem;
  }

  &.label.weight {
    font-size: 1.2rem;
  }
`;

const NewWeightHeader = styled.div`
  min-width: 24%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

type NewWeightsFieldProps = {
  weightDetails:IWeightEntry;
  handleRemoveEntry: (id :string) => void;
};


const NewWeightsField: React.FC<NewWeightsFieldProps> = ({weightDetails, handleRemoveEntry} ) => {
  const [weight, setWeight] = useState<string>((weightDetails.weight || '').toString() );
  const [covers, setCovers] = useState<string>((weightDetails.wastage || '').toString() );
  const [touch, setTouch] = useState<string>((weightDetails.touch || '').toString());
  const [netWeight, setNetWeight] = useState<string>((weightDetails.touch || '00.000kg').toString());

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newWeight = event.target.value;
    setWeight(newWeight);
    calculateNetWeight(newWeight, covers, touch);
  };

  const handleCoversChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCovers = event.target.value;
    setCovers(newCovers);
    calculateNetWeight(weight, newCovers, touch);
  };

  const handleTouchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTouch = event.target.value;
    setTouch(newTouch);
    calculateNetWeight(weight, covers, newTouch);
  };

  const calculateNetWeight = (weight: string, covers: string, touch: string) => {
    const weightValue = parseFloat(weight) || 0;
    const coversValue = parseFloat(covers) || 0;
    const touchValue = parseFloat(touch) || 0;

    if (weight && touch) {
      const computedNetWeight = (weightValue - (coversValue/1000) ) * touchValue / 100;
      setNetWeight(`${computedNetWeight}kg`);
    } else {
      setNetWeight('0.000kg');
    }
  };

  return (
    <NewWeightWrapper id={weightDetails.id}>
      <CancelIcon className="cancel-icon" onClick={() => { 
        debugger;
        handleRemoveEntry(weightDetails.id)}} />
      <NewWeight>
        <WeightField
          id="weight-field-1"
          label="New Weight"
          value={weight}
          onChange={handleWeightChange}
        />
        <CoversField
          id="covers-field-1"
          label="Covers"
          value={covers}
          onChange={handleCoversChange}
        />
        <TouchField
          id="touch-field-1"
          label="Touch"
          value={touch}
          onChange={handleTouchChange}
        />

        <NewWeightHeader>
          <NewWeightNetWeightLabel className="label">= Nt Wht</NewWeightNetWeightLabel>
          <NewWeightNetWeightLabel className="label weight">{netWeight}</NewWeightNetWeightLabel>
        </NewWeightHeader>
      </NewWeight>
    </NewWeightWrapper>
  );
};

export default NewWeightsField;

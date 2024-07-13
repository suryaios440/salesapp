// src/OldWeightsField.tsx
import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import WeightField from './WeightField';
import CoversField from './CoversField';
import TouchField from './TouchField';
import { IWeightEntry } from '../../models/SalesData';


const OldWeight = styled(Box)`
  display: flex;
  position: relative;
  align-items: center;
  border: 1px solid red;
  padding: 10px;
  border-radius: 4px;
  justify-content: space-between;
`;

const OldWeightWrapper = styled.div`
  position: relative;
  margin-top: 15px;

  .cancel-icon {
    position: absolute;
    top: -12px;
    right: -12px;
    z-index: 2;
  }
`;

const OldWeightLabel = styled(Typography)`
  color: red;
  margin-bottom: 10px;
`;

const OldWeightNetWeightLabel = styled(Typography)`
  color: red;
  margin-bottom: 10px;

  &.label {
    font-size: 0.7rem;
  }

  &.label.weight {
    font-size: 1.2rem;
  }
`;

const OldWeightHeader = styled.div`
  min-width: 24%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

type OldWeightsFieldProps = {
  weightDetails:IWeightEntry;
  handleRemoveEntry: (id :string) => void;
};


const OldWeightsField: React.FC<OldWeightsFieldProps> = ({weightDetails, handleRemoveEntry} ) => {
  const [weight, setWeight] = useState<string>((weightDetails.weight || '').toString() );
  const [covers, setCovers] = useState<string>((weightDetails.wastage || '').toString() );
  const [touch, setTouch] = useState<string>((weightDetails.touch || '').toString());
  const [netWeight, setNetWeight] = useState<string>((weightDetails.touch || '00.000kg').toString());

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const OldWeight = event.target.value;
    setWeight(OldWeight);
    calculateNetWeight(OldWeight, covers, touch);
  };

  const handleCoversChange = (event: ChangeEvent<HTMLInputElement>) => {
    const OldCovers = event.target.value;
    setCovers(OldCovers);
    calculateNetWeight(weight, OldCovers, touch);
  };

  const handleTouchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const OldTouch = event.target.value;
    setTouch(OldTouch);
    calculateNetWeight(weight, covers, OldTouch);
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
    <OldWeightWrapper id={weightDetails.id}>
      <CancelIcon className="cancel-icon" onClick={() => { 
        debugger;
        handleRemoveEntry(weightDetails.id)}} />
      <OldWeight>
        <WeightField
          id="weight-field-1"
          label="Old Weight"
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

        <OldWeightHeader>
          <OldWeightNetWeightLabel className="label">= Nt Wht</OldWeightNetWeightLabel>
          <OldWeightNetWeightLabel className="label weight">{netWeight}</OldWeightNetWeightLabel>
        </OldWeightHeader>
      </OldWeight>
    </OldWeightWrapper>
  );
};

export default OldWeightsField;

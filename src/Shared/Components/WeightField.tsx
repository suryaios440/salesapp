import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import NumberFormatCustom from './WeightFormatter';

type WeightFieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
};

const CustomTextField = styled(TextField)<{ width?: string }>(({ width }) => ({
  width: width || '100%', // Set the width, default to 50%
  '& .MuiOutlinedInput-root': {
    input: {
      padding: '5px 6px !important'
    },
   
    '& fieldset': {
      borderColor: 'green', // Change the border color
    },
    '&:hover fieldset': {
      borderColor: 'green', // Change the border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green', // Change the border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: 'green', // Change the label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'green', // Change the label color when focused
  },
  '& .MuiOutlinedInput-input': {
    color: 'green', // Change the input text color
  },
  '& .Mui-error': {
    '& fieldset': {
      borderColor: 'orange', // Change the border color when there's an error
    },
    '& .MuiInputLabel-root': {
      color: 'orange', // Change the label color when there's an error
    },
    '& .MuiOutlinedInput-input': {
      color: 'orange', // Change the input text color when there's an error
    },
  },
}));

const WeightField: React.FC<WeightFieldProps> = ({ label, id, value, onChange, width = '125%' }) => {
  return (
    <div>
      <CustomTextField
        label={label}
        id={id}
        variant="outlined"
        value={value}
        onChange={onChange}
        //helperText={value === '' ? 'This field is required' : ''}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
            inputComponent: NumberFormatCustom as any,
            inputProps: { inputMode: 'decimal', pattern: '[0-9]*' }
          }}
        width={width}
        size="small"
      />
    </div>
  );
};

export default WeightField;
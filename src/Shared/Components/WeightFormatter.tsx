import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import NumberFormat, { NumberFormatValues, NumericFormat, NumericFormatProps } from 'react-number-format';

// Define the props for NumberFormatCustom
interface NumberFormatCustomProps extends Omit<NumericFormatProps, 'onValueChange'> {
  inputRef: (instance: any) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

// Custom NumberFormat component for weight input
const NumberFormatCustom: React.FC<NumberFormatCustomProps> = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values: NumberFormatValues) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isAllowed={(values) => {
        const { floatValue } = values;
        return (floatValue || 0) <= 100;
      }}
      decimalSeparator='.'
      thousandSeparator=','
  
      valueIsNumericString={true}
      suffix=" kg"
    />
  );
};

export default NumberFormatCustom;
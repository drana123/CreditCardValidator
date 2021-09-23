import * as PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import React from "react";

  export const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === "") {
        onValueChange();
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
    return (
      <Input
        
        type="number"
        classes={{
          input: classes.numericInput,
          root: classes.root,
        }}
        fullWidth
        value={value === undefined ? '' : value}
        inputProps={{
          min: 0,
          placeholder: 'Filter...',
        }}
        onChange={handleChange}
      />
    );
  };
  
  CurrencyEditorBase.propTypes = {
    value: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };
  
  CurrencyEditorBase.defaultProps = {
    value: undefined
  };
  
import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material';

const ChartWithColumnSelection = ({ columns, selectedColumns, handleColumnChange, children }) => (
  <Box>
    <FormGroup>
      {columns.map((column) => (
        <FormControlLabel
          key={column}
          control={
            <Checkbox
              checked={selectedColumns[column] || false}
              onChange={(event) => handleColumnChange(event, column)}
              name={column}
            />
          }
          label={column}
        />
      ))}
    </FormGroup>
    {children}
  </Box>
);

export default ChartWithColumnSelection;

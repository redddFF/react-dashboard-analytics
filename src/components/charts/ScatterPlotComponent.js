// src/components/ScatterPlotComponent.js
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ScatterPlotComponent = ({ data, xKey, yKey }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey={xKey} name={xKey} />
        <YAxis type="number" dataKey={yKey} name={yKey} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Scatter Plot" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlotComponent;

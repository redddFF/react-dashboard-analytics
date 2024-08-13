// src/components/LineChartComponent.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data }) => {
  // Extract keys from data for LineChart
  const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key) => (
          <Line key={key} type="monotone" dataKey={key} stroke="#8884d8" />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

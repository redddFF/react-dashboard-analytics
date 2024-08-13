// src/components/BarChartComponent.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
  // Extract keys from data for BarChart
  const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
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
          <Bar key={key} dataKey={key} fill="#8884d8" />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

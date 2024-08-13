// src/components/AreaChartComponent.js
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartComponent = ({ data }) => {
  // Extract keys from data for AreaChart
  const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {keys.map((key, index) => (
            <linearGradient key={key} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {keys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke="#8884d8"
            fillOpacity={1}
            fill={`url(#color${index})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;

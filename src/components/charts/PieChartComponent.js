import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ data }) => {
  // Prepare the transformed data
  const transformedData = data.map(item => ({
    name: item.name,
    value: Object.values(item).reduce((acc, val) => (typeof val === 'number' ? acc + val : acc), 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={500}> {/* Increase the height here */}
      <PieChart>
        <Pie 
          dataKey="value" 
          startAngle={180}
          endAngle={0} 
          data={transformedData} 
          cx="50%" 
          cy="50%" 
          outerRadius={150} // Increase the outerRadius here
          fill="#8884d8" 
          label
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;

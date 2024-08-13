// src/utils/transformData.js
export const transformData = (data, selectedColumns, limit = 50) => {
  const limitedData = data.slice(0, limit);
  return limitedData.map((item, index) => {
    const transformedItem = { name: item.name || `Item ${index + 1}` };
    Object.keys(selectedColumns).forEach(column => {
      if (selectedColumns[column]) {
        transformedItem[column] = item[column];
      }
    });
    return transformedItem;
  });
};

export const transformPieData = (data) => {
  return data.map(item => ({
    name: item.name,
    value: Object.values(item).reduce((acc, val) => (typeof val === 'number' ? acc + val : acc), 0),
  }));
};

export const getScatterKeys = (selectedColumns) => {
  const scatterColumns = Object.keys(selectedColumns).filter(key => selectedColumns[key]);
  return { xKey: scatterColumns[0], yKey: scatterColumns[1] };
};

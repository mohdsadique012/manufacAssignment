import React, { useState, useEffect } from 'react';
import "../../Style/FlavanoidsStyle.css"
const FlavanoidsStats = () => {
  const [data, ] = useState([
    { Alcohol: 1, Flavanoids: 1.1 },
    { Alcohol: 1, Flavanoids: 1.2 },
    { Alcohol: 2, Flavanoids: 2.1 },
    { Alcohol: 2, Flavanoids: 2.2 },
    { Alcohol: 3, Flavanoids: 3.1 },
    { Alcohol: 3, Flavanoids: 3.2 },
  ]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const classes = {};
    data.forEach((item) => {
      const { Alcohol, Flavanoids } = item;
      if (!classes[Alcohol]) {
        classes[Alcohol] = [];
      }
      classes[Alcohol].push(Flavanoids);
    });

    const newStats = {};
    Object.keys(classes).forEach((cls) => {
      const classData = classes[cls];
      const mean = classData.reduce((acc, val) => acc + val, 0) / classData.length;
      const sortedData = classData.sort((a, b) => a - b);
      const median =
        sortedData.length % 2 === 0
          ? (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2
          : sortedData[(sortedData.length - 1) / 2];
      const modeMap = {};
      let mode = null;
      let maxCount = 0;
      classData.forEach((val) => {
        modeMap[val] = (modeMap[val] || 0) + 1;
        if (modeMap[val] > maxCount) {
          mode = val;
          maxCount = modeMap[val];
        }
      });
      newStats[cls] = { mean, median, mode };
    });

    setStats(newStats);
  }, [data]);

  return (
    <div className='Flavan-container'><table>
    <thead>
      <tr>
        <th>Measure</th>
        {Object.keys(stats).map((cls) => (
          <th key={cls}>Class {cls}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className='Flav-mean'>Flavanoids Mean</td>
        {Object.keys(stats).map((cls) => (
          <td key={cls}>{stats[cls].mean.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td className='Flav-mean'>Flavanoids Median</td>
        {Object.keys(stats).map((cls) => (
          <td key={cls}>{stats[cls].median.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td className='Flav-mean'>Flavanoids Mode</td>
        {Object.keys(stats).map((cls) => (
          <td key={cls}>{stats[cls].mode.toFixed(3)}</td>
        ))}
      </tr>
    </tbody>
  </table></div>
    
  );
};

export default FlavanoidsStats;

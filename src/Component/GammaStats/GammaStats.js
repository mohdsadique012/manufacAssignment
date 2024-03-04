import React, { useState } from 'react';
import "../../Style/GammaStyle.css"
const GammaStats = () => {
    const [data] = useState([
        { Alcohol: 1, Ash: 2, Hue: 3, Magnesium: 4 },
        { Alcohol: 1, Ash: 2, Hue: 3, Magnesium: 5 },
        { Alcohol: 2, Ash: 3, Hue: 4, Magnesium: 6 },
        { Alcohol: 2, Ash: 3, Hue: 4, Magnesium: 7 },
        { Alcohol: 3, Ash: 4, Hue: 5, Magnesium: 8 },
        { Alcohol: 4, Ash: 4, Hue: 5, Magnesium: 9 },
        // Add more data as needed
    ]);

    const calculateGamma = (point) => {
        return (point.Ash * point.Hue) / point.Magnesium;
    };

    const calculateMean = (data) => {
        const totalGamma = data.reduce((acc, curr) => acc + calculateGamma(curr), 0);
        return totalGamma / data.length;
    };

    const calculateMedian = (data) => {
        const gammas = data.map(point => calculateGamma(point)).sort((a, b) => a - b);
        const middleIndex = Math.floor(gammas.length / 2);
        if (gammas.length % 2 === 0) {
            return (gammas[middleIndex - 1] + gammas[middleIndex]) / 2;
        } else {
            return gammas[middleIndex];
        }
    };

    const calculateMode = (data) => {
        const gammaMap = {};
        data.forEach(point => {
            const gamma = calculateGamma(point);
            gammaMap[gamma] = (gammaMap[gamma] || 0) + 1;
        });
        let mode = null;
        let maxCount = 0;
        for (const gamma in gammaMap) {
            if (gammaMap[gamma] > maxCount) {
                mode = parseFloat(gamma);
                maxCount = gammaMap[gamma];
            }
        }
        return mode;
    };

    const uniqueClasses = [...new Set(data.map(item => item.Alcohol))];

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {uniqueClasses.map(clazz => (
                            <th key={clazz}>Class {clazz}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='Flav-mean'>Gamma Mean</td>
                        {uniqueClasses.map(clazz => (
                            <td key={clazz}>{calculateMean(data.filter(item => item.Alcohol === clazz)).toFixed(3)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className='Flav-mean'>Gamma Median</td>
                        {uniqueClasses.map(clazz => (
                            <td key={clazz}>{calculateMedian(data.filter(item => item.Alcohol === clazz)).toFixed(3)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className='Flav-mean'>Gamma Mode</td>
                        {uniqueClasses.map(clazz => (
                            <td key={clazz}>{calculateMode(data.filter(item => item.Alcohol === clazz)).toFixed(3)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default GammaStats;


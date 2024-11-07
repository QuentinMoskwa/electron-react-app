// DiskInfo.tsx
import React from 'react';
import { DiskData } from '../../main/types';
import ReactSpeedometer from 'react-d3-speedometer';

interface DiskInfoProps {
  disk: DiskData;
}

const DiskInfo: React.FC<DiskInfoProps> = ({ disk }) => {
  return (
    <div>
      <h2>{disk.mount} </h2>
      {/* <p>Disque : {disk.mount} </p> */}
      <p>Capacité totale : {disk.size} Go</p>
      <p>Espace utilisé : {disk.used} Go</p>
      {/* speedometer for the percentage of disk used */}
      <ReactSpeedometer
        maxValue={100}
        value={disk.usedPercentage}
        needleColor="red"
        startColor="green"
        endColor="red"
        segments={10}
        currentValueText={`Espace utilisé : ${disk.usedPercentage}%`}
      />
    </div>
  );
};

export default DiskInfo;

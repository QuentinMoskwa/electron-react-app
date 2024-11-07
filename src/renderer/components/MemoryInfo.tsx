// components/MemoryInfo.tsx
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { MemoryData } from '../../main/types';

interface MemoryInfoProps {
  memory: MemoryData;
}

const MemoryInfo: React.FC<MemoryInfoProps> = ({ memory }) => (
  <div>
    <h2>RAM</h2>
    <ReactSpeedometer
      maxValue={100}
      value={memory.usage}
      needleColor="blue"
      startColor="green"
      endColor="orange"
      segments={10}
      currentValueText={`charge RAM: ${memory.usage}%`}
    />
  </div>
);

export default MemoryInfo;

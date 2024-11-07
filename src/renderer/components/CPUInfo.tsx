// components/CPUInfo.tsx
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { CPUData } from '../../main/types';

interface CPUInfoProps {
  cpu: CPUData;
}

const CPUInfo: React.FC<CPUInfoProps> = ({ cpu }) => (
  <div>
    <h2>CPU</h2>
    <p>Model: {cpu.model || 'N/A'}</p>
    <ReactSpeedometer
      maxValue={100}
      value={cpu.load}
      needleColor="red"
      startColor="green"
      endColor="red"
      segments={10}
      currentValueText={`charge CPU: ${cpu.load}%`}
    />
  </div>
);

export default CPUInfo;

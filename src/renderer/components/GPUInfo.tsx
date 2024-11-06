// GPUInfo.tsx
import React from 'react';

interface GPUInfoProps {
  model: string;
  usage: number;
}

const GPUInfo: React.FC<GPUInfoProps> = ({ model, usage }) => {
  return (
    <div>
      <h2>GPU</h2>
      <p>Modèle : {model}</p>
      <p>Utilisation : {usage}%</p>
    </div>
  );
};

export default GPUInfo;

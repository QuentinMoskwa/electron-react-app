// DiskInfo.tsx
import React from 'react';

interface DiskInfoProps {
  total: number;
  used: number;
  free: number;
}

const DiskInfo: React.FC<DiskInfoProps> = ({ total, used, free }) => {
  return (
    <div>
      <h2>Disques</h2>
      <p>Capacité totale : {total} Go</p>
      <p>Espace utilisé : {used} Go</p>
      <p>Espace libre : {free} Go</p>
    </div>
  );
};

export default DiskInfo;

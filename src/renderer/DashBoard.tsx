import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

interface DashboardInfo {
  cpu: {
    model: string;
    cores: number;
    load: number;
  };
  memory: {
    usage: number;
  };
}

const Dashboard: React.FC = () => {
  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const response = await window.electron.ipcRenderer.getSystemInfo();
        setDashboardInfo(response);
      } catch (err) {
        setError('Failed to load dashboard information.');
        console.error(err);
      }
    };

    const intervalId = setInterval(fetchDashboardInfo, 2000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboardInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>CPU</h2>
      <p>Model: {dashboardInfo.cpu.model || 'N/A'}</p>
      <p>Cores: {dashboardInfo.cpu.cores || 'N/A'}</p>

      <ReactSpeedometer
        maxValue={100}
        value={dashboardInfo.cpu.load}
        needleColor="red"
        startColor="green"
        endColor="red"
        segments={10}
        currentValueText="CPU Load: ${value}%"
      />

      <h2>Memory</h2>
      <ReactSpeedometer
        maxValue={100}
        value={dashboardInfo.memory.usage}
        needleColor="blue"
        startColor="green"
        endColor="orange"
        segments={10}
        currentValueText="Memory Usage: ${value}%"
      />
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import CPUInfo from './CPUInfo';
import MemoryInfo from './MemoryInfo';
import { DashboardInfo } from '../main/types';

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
    fetchDashboardInfo();

    // intervalle de 2sec
    const intervalId = setInterval(fetchDashboardInfo, 2000);

    // Nettoyage de l'intervalle pour éviter les fuites de mémoire
    return () => clearInterval(intervalId);
  }, []);


  if (error) return <div>{error}</div>;
  if (!dashboardInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <CPUInfo cpu={dashboardInfo.cpu} />
      <MemoryInfo memory={dashboardInfo.memory} />
    </div>
  );
};

export default Dashboard;

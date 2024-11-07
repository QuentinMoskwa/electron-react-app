import React, { useEffect, useState } from 'react';
import CPUInfo from './components/CPUInfo';
import MemoryInfo from './components/MemoryInfo';
import { DashboardInfo } from '../main/types';
import DiskInfo from './components/DiskInfo';

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
  if (!dashboardInfo) return <div>Chargement des données...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboards-container">
          <div className="component-container">
            <CPUInfo cpu={dashboardInfo.cpu} />
          </div>
          <div className="component-container">
            <MemoryInfo memory={dashboardInfo.memory} />
          </div>
        </div>
        <div className="dashboards-container">
          <div className="component-container">
            <DiskInfo disk={dashboardInfo.disk1} />
          </div>
          <div className="component-container">
            <DiskInfo disk={dashboardInfo.disk2} />
          </div>
        </div>
      </div>
      {/* bouton pour lancer un diagnostic de santé du pc */}
      <button onClick={() => { /* Add your diagnostic function here */ }}>
        Diagnostic
      </button>
    </div>
  );
};

export default Dashboard;

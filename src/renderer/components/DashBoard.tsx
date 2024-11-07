// Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { fetchSystemData } from '../../services/systemServices'; // Importer le service
import CPUInfo from './CPUInfo';
import MemoryInfo from './MemoryInfo';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import DiskInfo from './DiskInfo';
import { DashboardInfo } from '../../main/types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      const response = await fetchSystemData();
      if (response) {
        setDashboardInfo(response);
      } else {
        setError('Failed to load dashboard information.');
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
      <button onClick={() => navigate('/diagnostic')}>Diagnostic</button>
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
    </div>
  );
};

export default Dashboard;

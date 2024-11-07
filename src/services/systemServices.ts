// systemService.ts
import { DashboardInfo } from '../main/types';

export const fetchSystemData = async (): Promise<DashboardInfo | null> => {
  try {
    const response: DashboardInfo =
      await window.electron.ipcRenderer.getSystemInfo();
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des données système:', error);
    return null;
  }
};

export const fetchDiskData = async (): Promise<{
  diskC: number;
  diskD: number;
}> => {
  try {
    const response: DashboardInfo =
      await window.electron.ipcRenderer.getSystemInfo();
    return {
      diskC: response.disk1.usedPercentage,
      diskD: response.disk2.usedPercentage,
    };
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des données de disque:',
      error,
    );
    return { diskC: 0, diskD: 0 };
  }
};

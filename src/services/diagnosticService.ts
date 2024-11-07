import { fetchSystemData, fetchDiskData } from './systemServices';

export const runDiagnostic = async (
  updateProgress: (progress: number) => void,
) => {
  let cpuData: number[] = [];
  let memoryData: number[] = [];
  let diskDataC: number = 0;
  let diskDataD: number = 0;

  const fetchDiagnosticData = async () => {
    const response = await fetchSystemData();
    if (response) {
      cpuData.push(response.cpu.load);
      memoryData.push(response.memory.usage);
    }
  };

  const intervalId = setInterval(fetchDiagnosticData, 2000);

  const totalDuration = 60000; // 1 minute (60 seconds)
  const startTime = Date.now();

  return new Promise((resolve) => {
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min((elapsedTime / totalDuration) * 100, 100);
      updateProgress(progress);

      if (elapsedTime >= totalDuration) {
        clearInterval(intervalId);
        clearInterval(progressInterval);

        console.log('Fetching disk data...');
        fetchDiskData()
          .then((diskData) => {
            console.log('Disk data fetched:', diskData);
            diskDataC = diskData.diskC;
            diskDataD = diskData.diskD;

            const cpuAverage = calculateAverage(cpuData);
            const memoryAverage = calculateAverage(memoryData);

            const diagnosticSummary = {
              cpu: `CPU: ${getHealthStatus(cpuAverage)} (${cpuAverage.toFixed(2)}% utilisé en moyenne) - ${getExplanation(cpuAverage)}`,
              memory: `RAM: ${getHealthStatus(memoryAverage)} (${memoryAverage.toFixed(2)}% utilisé en moyenne) - ${getExplanation(memoryAverage)}`,
              diskC: `Disque C: ${getHealthStatus(diskDataC)} (${diskDataC.toFixed(2)}% utilisé) - ${getExplanation(diskDataC)}`,
              diskD: `Disque D: ${getHealthStatus(diskDataD)} (${diskDataD.toFixed(2)}% utilisé) - ${getExplanation(diskDataD)}`,
            };

            resolve(diagnosticSummary);
          })
          .catch((error) => {
            console.error('Error fetching disk data:', error);
            resolve({
              cpu: 'Erreur',
              memory: 'Erreur',
              diskC: 'Erreur',
              diskD: 'Erreur',
            });
          });
      }
    }, 1000);
  });
};

const calculateAverage = (data: number[]) => {
  const sum = data.reduce((acc, value) => acc + value, 0);
  return sum / data.length;
};

const getHealthStatus = (averageUsage: number) => {
  if (averageUsage < 40) return '🟢 En bon état';
  if (averageUsage < 70) return '🟡 Acceptable';
  if (averageUsage < 90) return '🟠 Risqué';
  return '🔴 Critique';
};

const getExplanation = (averageUsage: number) => {
  if (averageUsage < 40)
    return 'Aucun problème détecté, performances optimales.';
  if (averageUsage < 70)
    return 'Les performances sont acceptables, mais un suivi est conseillé.';
  if (averageUsage < 90)
    return 'Les performances sont dégradées, une surveillance est nécessaire.';
  return 'Surchauffe et risques potentiels d’usure ou de panne.';
};

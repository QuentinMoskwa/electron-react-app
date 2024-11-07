import { fetchSystemData, fetchDiskData } from './systemServices';

export const runDiagnostic = async () => {
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
  const progressInterval = setInterval(() => {
    // ici, vous pouvez gérer l'état de la progression dans le composant
  }, 2000);

  return new Promise((resolve) => {
    setTimeout(async () => {
      clearInterval(intervalId);
      clearInterval(progressInterval);

      // Récupérer les données des disques après la période d'analyse pour éviter de les fetch alors que la valeur ne bouge pas
      const diskData = await fetchDiskData();
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
    }, 60000);
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

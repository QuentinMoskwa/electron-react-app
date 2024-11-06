import osu from 'node-os-utils';

export const getSystemInfo = async () => {
  try {
    // CPU Info
    const cpuUsage = await osu.cpu.usage();
    const cpuModel = osu.cpu.model();
    const cpuCount = osu.cpu.count();

    // Memory Info
    const memoryInfo = await osu.mem.info();
    const memoryUsagePercentage = (
      (memoryInfo.usedMemMb / memoryInfo.totalMemMb) *
      100
    ).toFixed(2); // En pourcentage

    return {
      cpu: {
        model: cpuModel,
        cores: cpuCount,
        load: cpuUsage,
      },
      memory: {
        total: memoryInfo.totalMemMb,
        free: memoryInfo.freeMemMb,
        usage: parseFloat(memoryUsagePercentage), // En pourcentage
      },
    };
  } catch (error) {
    console.error('Error fetching combined system information:', error);
    throw error;
  }
};

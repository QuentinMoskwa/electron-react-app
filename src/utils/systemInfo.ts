// src/utils/systeminfo.ts

import osu from 'node-os-utils'; // Importer node-os-utils
import si from 'systeminformation'; // Importer systeminformation

export const getSystemInfo = async () => {
  try {
    const cpuUsage = await osu.cpu.usage(5000); // Get CPU usage percentage
    const cpuModel = osu.cpu.model(); // Get CPU model
    const cpuCount = osu.cpu.count(); // Get number of CPU cores
    const memInfo = await osu.mem.info(); // Get memory information
    // const diskInfo = await osu.drive.info(); // Get disk information
    const cpuTempetature = await si.cpuTemperature();
    // get the temperature of the main CPU
    const mainCPUTemp = cpuTempetature.main;


    return {
      cpu: {
        model: cpuModel,
        load: cpuUsage, // Pourcentage d'utilisation du CPU
        temperature: mainCPUTemp, // Température du CPU
      },
      memory: {
        total: memInfo.totalMemMb, // Total memory in MB
        used: memInfo.usedMemMb, // Used memory in MB
        free: memInfo.freeMemMb, // Free memory in MB
        usage: (memInfo.usedMemMb / memInfo.totalMemMb) * 100, // Pourcentage d'utilisation de la mémoire
      },
      // disk: diskInfo, // Informations sur le disque
    };
  } catch (error) {
    console.error('Failed to get system info:', error);
    throw error;
  }
};

// src/utils/systeminfo.ts

import osu from 'node-os-utils'; // Importer node-os-utils
import si from 'systeminformation'; // Importer systeminformation

export const getSystemInfo = async () => {
  try {

    // fixed to 2 decimal places
    const fixedTo2DecimalPlaces = (value: number) => parseFloat(value.toFixed(2));


    // const cpuUsage = await osu.cpu.usage(5000); // Get CPU usage percentage
    const cpuCurrenLoad = await si.currentLoad(); // Get CPU usage percentage
    const cpuUsage = cpuCurrenLoad.currentload; // Get CPU usage percentage
    const cpuModel = osu.cpu.model(); // Get CPU model
    const cpuCount = osu.cpu.count(); // Get number of CPU cores
    const memInfo = await osu.mem.info(); // Get memory information
    // const diskInfo = await osu.drive.info(); // Get disk information
    const cpuTempetature = await si.cpuTemperature();
    // get the temperature of the main CPU
    const mainCPUTemp = cpuTempetature.main;
    const fsSize = await si.fsSize();

    var diskSize = fsSize[0]?.size || 0; // Ajouter un fallback au cas où fsSize est vide
    // convert the disk size to GB
    diskSize = parseFloat((diskSize / 1024 / 1024 / 1024).toFixed(2));

    var diskUsed = fsSize[0]?.used || 0;
    // convert the used space to GB
    diskUsed = parseFloat((diskUsed / 1024 / 1024 / 1024).toFixed(2));

    const diskMount = fsSize[0]?.mount || 'N/A';
    
    // stock the disk size, used space and mount point
    const firstDiskInfo = {
      size: diskSize,
      used: diskUsed,
      usedPercentage: fixedTo2DecimalPlaces((diskUsed / diskSize) * 100),
      mount: diskMount,
    }

    var diskSize2 = fsSize[1]?.size || 0; // Ajouter un fallback au cas où fsSize est vide
    // convert the disk size to GB
    diskSize2 = parseFloat((diskSize2 / 1024 / 1024 / 1024).toFixed(2));

    var diskUsed2 = fsSize[1]?.used || 0;
    // convert the used space to GB
    diskUsed2 = parseFloat((diskUsed2 / 1024 / 1024 / 1024).toFixed(2));

    const diskMount2 = fsSize[1]?.mount || 'N/A';
    // stock the disk size, used space and mount point
    const secondDiskInfo = {
      size: diskSize2,
      used: diskUsed2,
      usedPercentage: fixedTo2DecimalPlaces((diskUsed2 / diskSize2) * 100),
      mount: diskMount2,
    };


    return {
      cpu: {
        model: cpuModel,
        load: fixedTo2DecimalPlaces(cpuUsage), // CPU usage percentage
        temperature: mainCPUTemp, // Température du CPU
      },
      memory: {
        total: memInfo.totalMemMb, // Total memory in MB
        used: memInfo.usedMemMb, // Used memory in MB
        free: memInfo.freeMemMb, // Free memory in MB
        usage: fixedTo2DecimalPlaces((memInfo.usedMemMb / memInfo.totalMemMb) * 100), // Memory usage percentage
      },
      disk1: firstDiskInfo,
      disk2: secondDiskInfo,
    };
  } catch (error) {
    console.error('Failed to get system info:', error);
    throw error;
  }
};

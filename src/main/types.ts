// types.ts
export interface CPUData {
  model: string;
  cores: number;
  load: number;
}

export interface MemoryData {
  usage: number;
}

export interface DiskData {
  size: number;
  used: number;
  usedPercentage: number;
  mount: string;
}

export interface DashboardInfo {
  cpu: CPUData;
  memory: MemoryData;
  disk1: DiskData;
  disk2: DiskData;
}

// types.ts
export interface CPUData {
  model: string;
  cores: number;
  load: number;
}

export interface MemoryData {
  usage: number;
}

export interface DashboardInfo {
  cpu: CPUData;
  memory: MemoryData;
}

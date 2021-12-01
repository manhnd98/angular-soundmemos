/**
 * Interface for the 'Record' data
 */
export interface RecordEntity {
  id: string | number; // Primary ID
  name: string;
}

export enum RecordState {
  STOP = 0,
  RECORDING = 1,
}

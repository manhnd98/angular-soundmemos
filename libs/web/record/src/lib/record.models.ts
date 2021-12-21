/**
 * Interface for the 'Record' data
 */
export interface RecordEntity {
  recording: boolean;

  canPlay: boolean;

  error: boolean;
}

export enum RecordState {
  STOP = 0,
  RECORDING = 1,
}

export type AudioBufferSize =
  | undefined
  | 0
  | 256
  | 512
  | 1024
  | 2048
  | 4096
  | 8192
  | 16384;

export interface FilteredAudioData {
  // Date.now()
  id: string;

  audioData: number[];
}

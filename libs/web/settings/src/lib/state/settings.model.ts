export interface ISettingForm {
  configClass: string;
  audioInput: IMediaDeviceInfo;
  videoInput: IMediaDeviceInfo;
  audioOutput: IMediaDeviceInfo;
  ioBufferSize: number;
  sampleRate: number;
  outputType: string;
  error?: boolean; //
}
export interface IMediaDeviceInfo extends MediaDeviceInfo {
  notExist?: boolean;
}

export interface SettingsState {
  audioInputDevices: IMediaDeviceInfo[];
  audioOutputDevices: IMediaDeviceInfo[];
  videoInputDevices: IMediaDeviceInfo[];
  configClass: string[];
  ioBufferSizes: number[];
  sampleRates: number[];
  outputTypes: string[];
  currentConfig: ISettingForm | null;
}

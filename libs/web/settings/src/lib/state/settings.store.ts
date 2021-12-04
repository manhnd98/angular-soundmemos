import { Inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { combineLatest } from 'rxjs';
import { MediaDevicesService } from '../settings/media-devices.service';
import {
  IMediaDeviceInfo,
  ISettingForm,
  SettingsState,
} from './settings.model';

const ENV = {
  CONFIG_CLASS: ['Audition', 'Recording', 'Custom'],
  IOBUFFER_SIZE: [1024, 2048, 4096],
  SAMPLE_RATES: [44100, 48000, 88200, 96000],
  OUTPUT_TYPES: ['wav', 'mp3'],
  CONFIG_NAME: 'SOUNDMEMOS_CONFIG',
  ...environment,
};

const initialState: SettingsState = {
  audioInputDevices: [] as IMediaDeviceInfo[],
  audioOutputDevices: [] as IMediaDeviceInfo[],
  videoInputDevices: [] as IMediaDeviceInfo[],
  configClass: ENV.CONFIG_CLASS,
  ioBufferSizes: ENV.IOBUFFER_SIZE,
  sampleRates: ENV.SAMPLE_RATES,
  outputTypes: ENV.OUTPUT_TYPES,
  currentConfig: JSON.parse(
    localStorage.getItem(ENV.CONFIG_NAME) || '{}'
  ) as ISettingForm,
};

@Injectable()
export class SettingsStore extends ImmerComponentStore<SettingsState> {
  /**
   * Update config if devices changge
   */
  updateDevices = this.updater((state, devices: IMediaDeviceInfo[][]) => {
    if (devices.length > 0) {
      state.audioInputDevices = devices[0];
      state.audioOutputDevices = devices[1];
      state.videoInputDevices = devices[2];
      if (state.currentConfig) {
        const error =
          this.deviceExist(
            state.audioInputDevices,
            state.currentConfig.audioInput
          ) ||
          this.deviceExist(
            state.audioOutputDevices,
            state.currentConfig.audioOutput
          ) ||
          this.deviceExist(
            state.videoInputDevices,
            state.currentConfig.videoInput
          );
        state.currentConfig.error = error;
      }
    }
  });

  /**
   * Save config
   */
  saveConfig = this.updater((state, devices: ISettingForm) => {
    devices.error = false;
    state.currentConfig = devices;
    localStorage.setItem(ENV.CONFIG_NAME, JSON.stringify(devices));
  });

  /**
   * [Select] Get state
   */
  readonly getSettingStates$ = this.select((state) => state);

  /**
   * [Select] Get state
   */
  readonly getCurrentConfig$ = this.select((state) => {
    console.log('OUTPUT', state);
    return state?.currentConfig;
  });

  constructor(
    @Inject(MediaDevicesService)
    private readonly mediaService: MediaDevicesService
  ) {
    super(initialState);
    combineLatest([
      this.mediaService.audioInputDevices$,
      this.mediaService.audioOutputDevices$,
      this.mediaService.videoInputDevices$,
    ]).subscribe(this.updateDevices);
  }

  /**
   * Check and update selected device is exist or not
   * @param devices
   * @param selected
   */
  deviceExist(
    devices: IMediaDeviceInfo[],
    selected: IMediaDeviceInfo | undefined
  ): boolean {
    if (!selected) return false;
    if (
      selected &&
      devices.findIndex((device) => device.deviceId === selected.deviceId) < 0
    ) {
      selected.notExist = true;
    } else {
      selected.notExist = false;
    }
    return selected.notExist;
  }
}

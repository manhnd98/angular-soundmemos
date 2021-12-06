import { MediaDevicesService } from '../settings/media-devices.service';
import { SettingsStore } from './settings.store';

describe('SettingsStore', () => {
  const mediaDeviceService = new MediaDevicesService();
  const componentStore = new SettingsStore(mediaDeviceService);

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});

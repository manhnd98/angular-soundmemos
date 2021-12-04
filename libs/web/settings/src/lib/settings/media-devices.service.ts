import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaDevicesService {
  _audioInputDevices$: BehaviorSubject<MediaDeviceInfo[]> = new BehaviorSubject(
    [] as MediaDeviceInfo[]
  );
  audioInputDevices$: Observable<MediaDeviceInfo[]> =
    this._audioInputDevices$.asObservable();

  _audioOutputDevices$: BehaviorSubject<MediaDeviceInfo[]> =
    new BehaviorSubject([] as MediaDeviceInfo[]);
  audioOutputDevices$: Observable<MediaDeviceInfo[]> =
    this._audioOutputDevices$.asObservable();

  _videoInputDevices$: BehaviorSubject<MediaDeviceInfo[]> = new BehaviorSubject(
    [] as MediaDeviceInfo[]
  );
  videoInputDevices$: Observable<MediaDeviceInfo[]> =
    this._videoInputDevices$.asObservable();

  constructor() {
    this.gotDevices = this.gotDevices.bind(this);
    this.getListOfDevices();
  }

  getListOfDevices(): void {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }
    // List cameras and microphones.
    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices)
      .catch(function (err) {
        console.log(err.name + ': ' + err.message);
      });

    navigator.mediaDevices.addEventListener('devicechange', () => {
      navigator.mediaDevices
        .enumerateDevices()
        .then(this.gotDevices)
        .catch(function (err) {
          console.log(err.name + ': ' + err.message);
        });
    });
  }

  gotDevices(deviceInfos: MediaDeviceInfo[]) {
    const audioInputDevices = [];
    const audioOutputDevices = [];
    const videoInputDevices = [];
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      if (deviceInfo.deviceId === 'default') continue;
      if (deviceInfo.deviceId === 'communications') continue;

      if (deviceInfo.kind === 'audioinput') {
        audioInputDevices.push(deviceInfo);
      } else if (deviceInfo.kind === 'audiooutput') {
        audioOutputDevices.push(deviceInfo);
      } else if (deviceInfo.kind === 'videoinput') {
        videoInputDevices.push(deviceInfo);
        console.log(deviceInfo);
      }
    }
    this._audioInputDevices$.next(audioInputDevices);
    this._audioOutputDevices$.next(audioOutputDevices);
    this._videoInputDevices$.next(videoInputDevices);
  }
}

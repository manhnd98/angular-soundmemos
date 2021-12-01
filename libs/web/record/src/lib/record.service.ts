import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR, WINDOW } from '@ng-web-apis/common';
@Injectable()
export class WebRecordService {
  constructor(
    @Inject(WINDOW) private windowRef: Window,
    @Inject(NAVIGATOR) private navigatorRef: Navigator
  ) {
    navigatorRef.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: '',
        },
      })
      .then(function (stream) {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        const chunks: Blob[] = [];

        mediaRecorder.addEventListener('dataavailable', function (event) {
          chunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', function () {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.play();
        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 3000);
      });
  }
}

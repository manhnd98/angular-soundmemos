import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR, WINDOW } from '@ng-web-apis/common';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { AudioBufferSize, FilteredAudioData } from './record.models';
@Injectable()
export class WebRecordService {
  private active$ = new BehaviorSubject<boolean>(false);

  private audio = new Audio();

  paused = false;

  private audioBuffer = new Subject<AudioBuffer>();

  readonly audioBuffer$ = this.audioBuffer.asObservable();

  private inputChannels = [];

  constructor(
    @Inject(WINDOW) private windowRef: Window,
    @Inject(NAVIGATOR) private navigatorRef: Navigator
  ) {}

  /**
   * Create new record stream with specific device Id
   * @param deviceId
   * @returns
   */
  public createRecordStream(
    bufferSize: AudioBufferSize = undefined,
    numberOfInputChannels = 2,
    numberOfOutputChannels = 2,
    deviceId?: string
  ) {
    const audio = deviceId ? { deviceId } : true;
    return new Observable<AudioProcessingEvent>((subscribe) => {
      let audioContext: AudioContext | null = null;
      this.navigatorRef.mediaDevices
        .getUserMedia({
          audio,
        })
        .then((stream) => {
          audioContext = new AudioContext();
          const mediaSource = audioContext.createMediaStreamSource(stream);
          const levelChecker = audioContext.createScriptProcessor(
            bufferSize,
            numberOfInputChannels,
            numberOfOutputChannels
          );

          mediaSource.connect(levelChecker);

          levelChecker.connect(audioContext.destination);

          levelChecker.onaudioprocess = (event: AudioProcessingEvent) => {
            console.log('event working in global');
            subscribe.next(event);
          };
        });

      return function unsubscribe() {
        console.log(audioContext);
        audioContext?.close();
      };
    });
  }

  public filterData(
    inputBuffer: AudioBuffer,
    channel: 0 | 1
  ): FilteredAudioData {
    const rawData = inputBuffer.getChannelData(channel);
    const samples = 1;
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;

      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }

      filteredData.push(
        sum / blockSize // divide the sum by the block size to get the average
      );
    }

    return {
      id: Date.now().toString(),
      audioData: filteredData,
    };
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import { WebRecordService } from '@soundmemos/record';
import { normalize } from '@soundmemos/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'soundmemos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  listBufferChannel0: number[] = [];

  private subscription: Subscription | null = null;

  constructor(
    @Inject(WebRecordService) private webRecordService: WebRecordService,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) {}

  onStartRecord() {
    this.subscription = this.webRecordService
      .createRecordStream(2048)
      .subscribe((event) => {
        // console.timeStamp();
        const inputBuffer = event.inputBuffer;
        const filteredAudioDataChannel0 = this.webRecordService.filterData(
          inputBuffer,
          0
        );
        const normalizedDataChannel0 = normalize(
          filteredAudioDataChannel0.audioData,
          0.3
        );
        this.listBufferChannel0 = [
          ...this.listBufferChannel0,
          ...normalizedDataChannel0,
        ];
        this.changeDetectorRef.detectChanges();
      });
  }

  onStopRecord() {
    this.subscription?.unsubscribe();
  }

  // ngAfterViewInit(): void {

  // }
}

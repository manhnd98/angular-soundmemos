import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Canvas2dDirective } from '@ng-web-apis/canvas';
import { tuiDefaultProp } from '@taiga-ui/cdk';
@Component({
  selector: 'soundmemos-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss'],
})
export class VisualizeComponent {
  private _soundData: Array<number> = [];
  @Input()
  set soundData(data: Array<number>) {
    this._soundData = data;
    this.changeDetectorRef.detectChanges();
  }

  get soundData() {
    return this._soundData;
  }

  @Input()
  @tuiDefaultProp(
    (height) => Number.isInteger(height) && height > 0,
    'should be integer number more than 0'
  )
  height = 100;

  @Input()
  @tuiDefaultProp(
    (width) => Number.isInteger(width) && width > 0,
    'should be integer number more than 0'
  )
  defaultWidth = 200;

  @Input() fillColor = '#44bc75';

  constructor(
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) {}

  @ViewChild(Canvas2dDirective, { static: true, read: Canvas2dDirective })
  private canvasDirective!: Canvas2dDirective;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.canvasDirective as any);
  }
}

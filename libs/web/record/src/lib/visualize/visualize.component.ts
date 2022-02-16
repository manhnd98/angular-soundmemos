import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { tuiDefaultProp } from '@taiga-ui/cdk';
import { MIN_HEIGHT_NODE } from '../tokens/min-height-node';
import { NODE_SPACE } from '../tokens/node-space';
import { NODE_WIDTH } from '../tokens/node-width';
import { SoundNode } from './sound-node';
@Component({
  selector: 'soundmemos-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizeComponent implements OnInit, AfterViewInit {
  @Input()
  @tuiDefaultProp(
    (height) => Number.isInteger(height) && height > 0,
    'should be integer number more than 0'
  )
  height = this.windowRef.innerHeight;

  @Input()
  @tuiDefaultProp(
    (width) => Number.isInteger(width) && width > 0,
    'should be integer number more than 0'
  )
  width = this.windowRef.innerWidth;

  @ViewChild('canvasElement', { static: true })
  private canvasElementRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(WINDOW) private windowRef: Window,
    @Inject(MIN_HEIGHT_NODE) private minHeight: number,
    @Inject(NODE_WIDTH) private nodeWidth: number,
    @Inject(NODE_SPACE) private nodeSpace: number,
    @Attribute('background') public backgroundColor: string
  ) {}

  ngOnInit(): void {
    console.log('keep');
  }

  ngAfterViewInit(): void {
    const context = this.canvas.getContext('2d');
    for (let index = 0; index < this.numberOfNodeInView; index++) {
      const node = new SoundNode(
        this.nodeWidth,
        5,
        (this.nodeWidth + this.nodeSpace) * index,
        this.centerHeight
      );
      node.draw(context);
    }

    // For debug
    context?.beginPath();

    context?.moveTo(0, this.centerHeight);
    context?.lineTo(this.windowRef.innerWidth, this.centerHeight);
    context?.stroke();
  }

  /**
   * Return canvas element from canvas element ref
   * Because canvasElementRef is a static element, please make sure that we have that element in view
   * and get canvas after onInit
   */
  get canvas(): HTMLCanvasElement {
    return this.canvasElementRef.nativeElement;
  }

  get centerHeight(): number {
    return this.height / 2;
  }

  get numberOfNodeInView() {
    return this.width / (this.nodeWidth + this.nodeSpace);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasModule } from '@ng-web-apis/canvas';
import { VisualizeComponent } from './visualize.component';

@NgModule({
  declarations: [VisualizeComponent],
  imports: [CommonModule, CanvasModule],
  exports: [VisualizeComponent],
})
export class VisualizeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasModule } from '@ng-web-apis/canvas';
import { VisualizeComponent } from './visualize.component';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [VisualizeComponent],
  imports: [CommonModule, CanvasModule, TuiLetModule],
  exports: [VisualizeComponent],
})
export class VisualizeModule {}

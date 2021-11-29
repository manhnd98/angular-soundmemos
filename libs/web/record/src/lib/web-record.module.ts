import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRecord from './state/record.reducer';
import { RecordEffects } from './state/record.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRecord.RECORD_FEATURE_KEY, fromRecord.reducer),
    EffectsModule.forFeature([RecordEffects]),
  ],
})
export class WebRecordModule {}

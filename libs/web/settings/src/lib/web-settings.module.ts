import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSettings from './state/settings.reducer';
import { SettingsEffects } from './state/settings.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSettings.SETTINGS_FEATURE_KEY,
      fromSettings.reducer
    ),
    EffectsModule.forFeature([SettingsEffects]),
  ],
})
export class WebSettingsModule {}

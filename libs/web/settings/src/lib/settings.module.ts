import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { SettingsComponent } from './settings/settings.component';
import { SettingsStore } from './state/settings.store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputModule,
    TuiLabelModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiMarkerIconModule,
  ],
  declarations: [SettingsComponent],
  entryComponents: [SettingsComponent],
  providers: [SettingsStore],
  exports: [SettingsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule {}

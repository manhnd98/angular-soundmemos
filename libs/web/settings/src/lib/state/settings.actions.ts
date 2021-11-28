import { createAction, props } from '@ngrx/store';
import { SettingsEntity } from './settings.models';

export const init = createAction('[Settings Page] Init');

export const loadSettingsSuccess = createAction(
  '[Settings/API] Load Settings Success',
  props<{ settings: SettingsEntity[] }>()
);

export const loadSettingsFailure = createAction(
  '[Settings/API] Load Settings Failure',
  props<{ error: any }>()
);

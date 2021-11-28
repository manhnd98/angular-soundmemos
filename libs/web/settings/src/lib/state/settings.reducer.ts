import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SettingsActions from './settings.actions';
import { SettingsEntity } from './settings.models';

export const SETTINGS_FEATURE_KEY = 'settings';

export interface State extends EntityState<SettingsEntity> {
  selectedId?: string | number; // which Settings record has been selected
  loaded: boolean; // has the Settings list been loaded
  error?: string | null; // last known error (if any)
}

export interface SettingsPartialState {
  readonly [SETTINGS_FEATURE_KEY]: State;
}

export const settingsAdapter: EntityAdapter<SettingsEntity> =
  createEntityAdapter<SettingsEntity>();

export const initialState: State = settingsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SettingsActions.loadSettingsSuccess, (state, { settings }) =>
    settingsAdapter.setAll(settings, { ...state, loaded: true })
  ),
  on(SettingsActions.loadSettingsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return settingsReducer(state, action);
}

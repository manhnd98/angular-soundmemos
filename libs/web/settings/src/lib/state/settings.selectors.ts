import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SETTINGS_FEATURE_KEY,
  State,
  settingsAdapter,
} from './settings.reducer';

// Lookup the 'Settings' feature state managed by NgRx
export const getSettingsState =
  createFeatureSelector<State>(SETTINGS_FEATURE_KEY);

const { selectAll, selectEntities } = settingsAdapter.getSelectors();

export const getSettingsLoaded = createSelector(
  getSettingsState,
  (state: State) => state.loaded
);

export const getSettingsError = createSelector(
  getSettingsState,
  (state: State) => state.error
);

export const getAllSettings = createSelector(getSettingsState, (state: State) =>
  selectAll(state)
);

export const getSettingsEntities = createSelector(
  getSettingsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSettingsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSettingsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

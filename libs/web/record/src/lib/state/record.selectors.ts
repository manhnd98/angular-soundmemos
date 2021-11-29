import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RECORD_FEATURE_KEY, State, recordAdapter } from './record.reducer';

// Lookup the 'Record' feature state managed by NgRx
export const getRecordState = createFeatureSelector<State>(RECORD_FEATURE_KEY);

const { selectAll, selectEntities } = recordAdapter.getSelectors();

export const getRecordLoaded = createSelector(
  getRecordState,
  (state: State) => state.loaded
);

export const getRecordError = createSelector(
  getRecordState,
  (state: State) => state.error
);

export const getAllRecord = createSelector(getRecordState, (state: State) =>
  selectAll(state)
);

export const getRecordEntities = createSelector(
  getRecordState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getRecordState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getRecordEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RecordActions from './record.actions';
import { RecordEntity } from './record.models';

export const RECORD_FEATURE_KEY = 'record';

export interface State extends EntityState<RecordEntity> {
  selectedId?: string | number; // which Record record has been selected
  loaded: boolean; // has the Record list been loaded
  error?: string | null; // last known error (if any)
}

export interface RecordPartialState {
  readonly [RECORD_FEATURE_KEY]: State;
}

export const recordAdapter: EntityAdapter<RecordEntity> =
  createEntityAdapter<RecordEntity>();

export const initialState: State = recordAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const recordReducer = createReducer(
  initialState
  // on(RecordActions.init, (state) => ({ ...state, loaded: false, error: null })),
  // on(RecordActions.loadRecordSuccess, (state, { record }) =>
  //   recordAdapter.setAll(record, { ...state, loaded: true })
  // ),
  // on(RecordActions.loadRecordFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  // }))
);

export function reducer(state: State | undefined, action: Action) {
  return recordReducer(state, action);
}

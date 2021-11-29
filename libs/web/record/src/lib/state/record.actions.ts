import { createAction, props } from '@ngrx/store';
import { RecordEntity } from './record.models';

export const init = createAction('[Record Page] Init');

export const loadRecordSuccess = createAction(
  '[Record/API] Load Record Success',
  props<{ record: RecordEntity[] }>()
);

export const loadRecordFailure = createAction(
  '[Record/API] Load Record Failure',
  props<{ error: any }>()
);

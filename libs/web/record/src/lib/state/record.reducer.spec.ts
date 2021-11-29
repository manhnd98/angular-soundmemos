import { Action } from '@ngrx/store';

import * as RecordActions from './record.actions';
import { RecordEntity } from './record.models';
import { State, initialState, reducer } from './record.reducer';

describe('Record Reducer', () => {
  const createRecordEntity = (id: string, name = ''): RecordEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Record actions', () => {
    it('loadRecordSuccess should return the list of known Record', () => {
      const record = [
        createRecordEntity('PRODUCT-AAA'),
        createRecordEntity('PRODUCT-zzz'),
      ];
      const action = RecordActions.loadRecordSuccess({ record });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

import { RecordEntity } from './record.models';
import {
  recordAdapter,
  RecordPartialState,
  initialState,
} from './record.reducer';
import * as RecordSelectors from './record.selectors';

describe('Record Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRecordId = (it: RecordEntity) => it.id;
  const createRecordEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RecordEntity);

  let state: RecordPartialState;

  beforeEach(() => {
    state = {
      record: recordAdapter.setAll(
        [
          createRecordEntity('PRODUCT-AAA'),
          createRecordEntity('PRODUCT-BBB'),
          createRecordEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Record Selectors', () => {
    it('getAllRecord() should return the list of Record', () => {
      const results = RecordSelectors.getAllRecord(state);
      const selId = getRecordId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RecordSelectors.getSelected(state) as RecordEntity;
      const selId = getRecordId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getRecordLoaded() should return the current "loaded" status', () => {
      const result = RecordSelectors.getRecordLoaded(state);

      expect(result).toBe(true);
    });

    it('getRecordError() should return the current "error" state', () => {
      const result = RecordSelectors.getRecordError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

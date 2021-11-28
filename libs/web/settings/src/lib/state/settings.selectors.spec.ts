import { SettingsEntity } from './settings.models';
import {
  settingsAdapter,
  SettingsPartialState,
  initialState,
} from './settings.reducer';
import * as SettingsSelectors from './settings.selectors';

describe('Settings Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSettingsId = (it: SettingsEntity) => it.id;
  const createSettingsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SettingsEntity);

  let state: SettingsPartialState;

  beforeEach(() => {
    state = {
      settings: settingsAdapter.setAll(
        [
          createSettingsEntity('PRODUCT-AAA'),
          createSettingsEntity('PRODUCT-BBB'),
          createSettingsEntity('PRODUCT-CCC'),
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

  describe('Settings Selectors', () => {
    it('getAllSettings() should return the list of Settings', () => {
      const results = SettingsSelectors.getAllSettings(state);
      const selId = getSettingsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SettingsSelectors.getSelected(state) as SettingsEntity;
      const selId = getSettingsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSettingsLoaded() should return the current "loaded" status', () => {
      const result = SettingsSelectors.getSettingsLoaded(state);

      expect(result).toBe(true);
    });

    it('getSettingsError() should return the current "error" state', () => {
      const result = SettingsSelectors.getSettingsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

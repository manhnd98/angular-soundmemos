import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as SettingsActions from './settings.actions';
import * as SettingsFeature from './settings.reducer';

@Injectable()
export class SettingsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SettingsActions.loadSettingsSuccess({ settings: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SettingsActions.loadSettingsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}

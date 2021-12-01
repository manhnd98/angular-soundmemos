import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RecordActions from './record.actions';
import * as RecordFeature from './record.reducer';

@Injectable()
export class RecordEffects {
  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RecordActions.init),
  //     fetch({
  //       run: (action) => {
  //         // Your custom service 'load' logic goes here. For now just return a success action...
  //         return RecordActions.loadRecordSuccess({ record: [] });
  //       },
  //       onError: (action, error) => {
  //         console.error('Error', error);
  //         return RecordActions.loadRecordFailure({ error });
  //       },
  //     })
  //   )
  // );

  constructor(private readonly actions$: Actions) {}
}

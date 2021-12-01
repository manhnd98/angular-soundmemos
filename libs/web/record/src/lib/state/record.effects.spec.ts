import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RecordActions from './record.actions';
import { RecordEffects } from './record.effects';

// describe('RecordEffects', () => {
//   let actions: Observable<Action>;
//   let effects: RecordEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         RecordEffects,
//         provideMockActions(() => actions),
//         provideMockStore(),
//       ],
//     });

//     effects = TestBed.inject(RecordEffects);
//   });

//   describe('init$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: RecordActions.init() });

//       const expected = hot('-a-|', {
//         a: RecordActions.loadRecordSuccess({ record: [] }),
//       });

//       expect(effects.init$).toBeObservable(expected);
//     });
//   });
// });

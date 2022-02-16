import { InjectionToken } from '@angular/core';

export const NODE_SPACE_DEFAULT = 2;

export const NODE_SPACE = new InjectionToken<number>(
  'space between sound node',
  {
    providedIn: 'root',
    factory: () => NODE_SPACE_DEFAULT,
  }
);

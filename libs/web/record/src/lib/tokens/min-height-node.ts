import { InjectionToken } from '@angular/core';

export const MIN_HEIGHT_NODE_DEFAULT = 10;

/**
 * If a sound node height < MIN_HEIGHT_NODE then use MIN_HEIGHT_NODE
 * to avoid display to small sound or sound = 0
 */
export const MIN_HEIGHT_NODE = new InjectionToken<number>(
  'Min height for a sound node in visualize component',
  {
    providedIn: 'root',
    factory: () => MIN_HEIGHT_NODE_DEFAULT,
  }
);

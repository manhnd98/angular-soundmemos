import { InjectionToken } from '@angular/core';

export const NODE_WIDTH_DEFAULT = 3;

export const NODE_WIDTH = new InjectionToken<number>('visualize width node', {
  providedIn: 'root',
  factory: () => NODE_WIDTH_DEFAULT,
});

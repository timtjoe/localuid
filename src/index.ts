import { Generator } from './engine';

/**
 * localuid: Lightweight, secure, URL-friendly ID generator.
 */
export const localuid = new Generator();

export type { Config, LocalUID } from './types';
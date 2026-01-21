/**
 * Configuration for ID generation.
 */
export interface Config {
  /** Desired length: 6 to 13 characters. */
  length: number;
}

/**
 * Core generation methods.
 */
export interface LocalUID {
  /** Digits only (0-9). Ensures no leading zero. */
  number(config: Config): string;
  
  /** Letters only (a-z, A-Z). */
  alpha(config: Config): string;
  
  /** Letters and Digits. */
  alphanumeric(config: Config): string;
  
  /** Custom character set string. */
  custom(config: Config, charset: string): string;
}
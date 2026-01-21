export const LIMITS = { MIN: 6, MAX: 13 };

/**
 * Sanitizes and validates user input.
 */
export function validate(length: number): void {
  if (!Number.isInteger(length) || length < LIMITS.MIN || length > LIMITS.MAX) {
    throw new Error(`localuid: Length must be an integer between ${LIMITS.MIN} and ${LIMITS.MAX}.`);
  }
}

/**
 * Cryptographically secure random selector.
 */
export function generate(charset: string, length: number): string {
  let result = "";
  const len = charset.length;
  const buffer = new Uint32Array(length);
  
  globalThis.crypto.getRandomValues(buffer);

  for (let i = 0; i < length; i++) {
    const char = charset[buffer[i] % len];
    result += char;
  }
  return result;
}
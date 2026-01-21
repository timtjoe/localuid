import type { Config, LocalUID } from './types';
import { validate, generate } from './utils';

export class Generator implements LocalUID {
  private readonly CHARSETS = {
    NUM: "0123456789",
    ALPHA: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    ALPHANUM: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  };

  /**
   * Generates a numeric ID.
   * Logic: (Random 1-9) + (Random 0-9 for remaining length)
   */
  number({ length }: Config): string {
    validate(length);
    const head = generate("123456789", 1);
    const tail = generate(this.CHARSETS.NUM, length - 1);
    return head + tail;
  }

  alpha({ length }: Config): string {
    validate(length);
    return generate(this.CHARSETS.ALPHA, length);
  }

  alphanumeric({ length }: Config): string {
    validate(length);
    return generate(this.CHARSETS.ALPHANUM, length);
  }

  custom({ length }: Config, charset: string): string {
    validate(length);
    if (!charset || charset.length < 2) {
      throw new Error("localuid: Custom charset must have at least 2 characters.");
    }
    return generate(charset, length);
  }
}
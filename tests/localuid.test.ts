import { expect, test, describe } from "bun:test";
import { localuid } from "../src/index";

describe("localuid - Security & Logic Verification", () => {
  
  test("Numeric: should never start with zero for URL/Database consistency", () => {
    // Run 1000 times to statistically ensure 0 never appears at index 0
    for (let i = 0; i < 1000; i++) {
      const id = localuid.number({ length: 6 });
      expect(id[0]).not.toBe("0");
      expect(id).toMatch(/^\d{6}$/);
    }
  });

  test("Alpha: should only contain letters [a-zA-Z]", () => {
    const id = localuid.alpha({ length: 12 });
    expect(id).toMatch(/^[a-zA-Z]+$/);
    expect(id.length).toBe(12);
  });

  test("Alphanumeric: should contain valid URL-friendly characters", () => {
    const id = localuid.alphanumeric({ length: 13 });
    expect(id).toMatch(/^[a-zA-Z0-9]+$/);
    expect(id.length).toBe(13);
  });

  test("Custom: should strictly use the provided charset", () => {
    const charset = "ABC123";
    const id = localuid.custom({ length: 10 }, charset);
    const chars = id.split("");
    const allValid = chars.every(c => charset.includes(c));
    
    expect(allValid).toBe(true);
    expect(id.length).toBe(10);
  });

  test("Validation: should throw errors for invalid lengths", () => {
    // Length too short (Min 6)
    expect(() => localuid.number({ length: 5 })).toThrow();
    
    // Length too long (Max 13)
    expect(() => localuid.alpha({ length: 14 })).toThrow();
    
    // Not an integer
    // @ts-ignore
    expect(() => localuid.alphanumeric({ length: 8.5 })).toThrow();
  });

  test("Entropy: 5000 generated IDs should have zero collisions", () => {
    const iterations = 5000;
    const results = new Set();
    
    for (let i = 0; i < iterations; i++) {
      results.add(localuid.alphanumeric({ length: 13 }));
    }
    
    // If set size matches iterations, every ID was unique
    expect(results.size).toBe(iterations);
  });
});
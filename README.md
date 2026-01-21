
![NPM Downloads](https://img.shields.io/npm/dt/localuid?style=flat-square&color=brightgreen)
![NPM Monthly Downloads](https://img.shields.io/npm/dm/localuid?style=flat-square&color=chartreuse)
![NPM Weekly Downloads](https://img.shields.io/npm/dw/localuid?style=flat-square&color=blue)

![Bundle Size](https://img.shields.io/bundlephobia/min/localuid?style=flat-square&color=blueviolet)
![Dependencies](https://img.shields.io/badge/dependencies-0-success?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Runtime](https://img.shields.io/badge/Runtime-Bun-black?style=flat-square&logo=bun)


![Build Status](https://img.shields.io/github/actions/workflow/status/timtjoe/localuid/publish.yaml?style=flat-square)
![Snyk Security](https://img.shields.io/snyk/vulnerabilities/npm/localuid?style=flat-square)
![Security Score](https://img.shields.io/badge/security-hardened-success?style=flat-square)


![GitHub stars](https://img.shields.io/github/stars/timtjoe/localuid?style=social)
![GitHub forks](https://img.shields.io/github/forks/timtjoe/localuid?style=social)
![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftimtjoe%2Flocaluid&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)



# localuid

A high-performance, cryptographically secure utility for generating clean, URL-friendly identifiers. Optimized for **Bun** and **TypeScript**.

`localuid` was designed to provide identifiers that are simultaneously robust enough for database primary keys and clean enough for public-facing URLs. `localuid` can be used for generating table IDs, short-links like `/1234kshdi`, or meeting-style access codes, `localuid` provides a secure, collision-resistant solution.

## Features

- **URL-Friendly:** Generates identifiers that are easy to read, type, and share.
- **Cryptographically Secure:** Powered by `CSPRNG` (via `globalThis.crypto`) for non-deterministic randomness.
- **Collision Resistant:** Designed with entropy in mind to ensure uniqueness across large datasets.
- **Beautiful Numbers:** Numeric outputs automatically avoid leading zeros, ensuring they remain valid mathematical representations.
- **Strictly Typed:** Minimalistic and robust TypeScript interfaces.

## Installation

```bash
bun add localuid
# or
npm install localuid

```

## Usage

```typescript
import { localuid } from "localuid";

// 1. Generate numeric IDs (Ideal for Table IDs)
// Ensures no leading zeros. Example: "12378690"
const tableId = localuid.number({ length: 8 });

// 2. Generate alphabetic identifiers (a-z, A-Z)
// Example: "aphens"
const fragment = localuid.alpha({ length: 6 });

// 3. Generate alphanumeric values (0-9, a-z, A-Z)
// Ideal for URL slugs. Example: "456980an"
const urlParam = localuid.alphanumeric({ length: 10 });

// 4. Custom Charsets
// Create human-friendly codes by excluding look-alike characters
const code = localuid.custom({ length: 6 }, "ABCDEFGHJKLMNPQRSTUVWXYZ23456789");
```

---

## The Mathematics of `localuid`

Understanding the probability of a **collision** (two identical IDs being generated) is vital for system integrity.

### Keyspace Calculation

The total number of unique possibilities () is calculated as , where is the character set size and is the length.

- **Numeric (`number`):** (Length 13 = 10 Trillion possibilities)
- **Alpha (`alpha`):** (Length 10 = 144 Trillion possibilities)
- **Alphanumeric (`alphanumeric`):** (Length 10 = 839 Quadrillion possibilities)

### Collision Probability (Birthday Paradox)

The following table estimates the number of IDs () you can generate before reaching a **1% chance** of a single collision occurring in your system.

| Method           | Length ($L$) | Total Pool ($N$) | 1% Collision Risk at ($k$) |
| ---------------- | ------------ | ---------------- | -------------------------- |
| **Numeric**      | 8            | $10^8$           | ~1,417 IDs                 |
| **Numeric**      | 13           | $10^{13}$        | ~450,000 IDs               |
| **Alphanumeric** | 10           | $62^{10}$        | ~130,000,000 IDs           |
| **Alphanumeric** | 13           | $62^{13}$        | ~20,000,000,000 IDs        |

**Recommendation:** For long-term uniqueness in distributed systems, use `alphanumeric` with a length of **10+** or `number` with a length of **13**.

---

## API Reference

### `.number({ length: number })`

Generates a string of digits (0-9).

- **Constraints:** Length must be between 6 and 13.
- **Safety:** Automatically prevents leading zeros.

### `.alpha({ length: number })`

Generates a string of letters `[a-z, A-Z]`.

### `.alphanumeric({ length: number })`

Generates a string of letters and digits `[a-z, A-Z, 0-9]`.

### `.custom({ length: number }, charset: string)`

Generates an ID using a user-provided character set. Use this to exclude confusing characters (e.g., `0, O, I, l`) for codes that need to be manually typed by users.

---

## Development & Testing

Built with **Bun** for maximum performance.

```bash
# Install dependencies
bun install

# Run secure test suite
bun test

# Build production artifacts
bun run build

```

## License

MIT

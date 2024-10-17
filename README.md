# @sunrabbit123/monad-util

This package is derived from https://github.com/SieR-VR/ts-features.

A utility library implementing the util monad in TypeScript.

## Installation

```bash
npm install @sunrabbit123/monad-util
# or
yarn add @sunrabbit123/monad-util
```

## Usage

```ts
import { Ok, Err, Result } from '@sunrabbit123/monad-util';

// Success case
const successResult: Result<number, Error> = Ok(42);
console.log(successResult.unwrap()); // 42

// Error case
const errorResult: Result<number, Error> = Err(new Error('Something went wrong'));
console.log(errorResult.unwrapErr().message); // 'Something went wrong'

// Chaining
const chainedResult = successResult.map((value) => value * 2).andThen((value) => Ok(value.toString()));

console.log(chainedResult.unwrap()); // '84'
```

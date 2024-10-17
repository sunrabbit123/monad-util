# @sunrabbit123/monad-util

This package is derived from https://github.com/SieR-VR/ts-features.

A utility library implementing the Result and Either monads in TypeScript.

## Installation

```bash
npm install @sunrabbit123/monad-util
# or
yarn add @sunrabbit123/monad-util
```

## Usage

### Result

```typescript
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

### Either

```typescript
import { Left, Right, Either } from '@sunrabbit123/monad-util';

// Left case
const leftValue: Either<string, number> = Left('Error message');
console.log(leftValue.isLeft()); // true

// Right case
const rightValue: Either<string, number> = Right(42);
console.log(rightValue.isLeft()); // false

// Using Either in a function
function divide(a: number, b: number): Either<string, number> {
  if (b === 0) {
    return Left('Division by zero');
  }
  return Right(a / b);
}

const result1 = divide(10, 2);
const result2 = divide(10, 0);

console.log(result1.isLeft() ? 'Error' : result1.data); // 5
console.log(result2.isLeft() ? result2.data : 'Success'); // 'Division by zero'
```

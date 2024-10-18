import { describe, it, expect } from 'vitest';
import { Left, Right, Either } from './either';

describe('Either', () => {
  it('should create Left', () => {
    const left: Either<string, number> = Left('error');
    expect(left.isLeft()).toBe(true);
    expect(left.isRight()).toBe(false);
    expect(left.data).toBe('error');
  });

  it('should create Right', () => {
    const right: Either<string, number> = Right(42);
    expect(right.isLeft()).toBe(false);
    expect(right.isRight()).toBe(true);
    expect(right.data).toBe(42);
  });

  it('should work with different types', () => {
    const leftString: Either<string, number> = Left('error');
    const rightNumber: Either<string, number> = Right(42);

    expect(leftString.isLeft()).toBe(true);
    expect(rightNumber.isRight()).toBe(true);
  });

  it('should handle complex types', () => {
    type ComplexType = { foo: string; bar: number };
    const complexRight: Either<string, ComplexType> = Right({ foo: 'hello', bar: 123 });

    expect(complexRight.isRight()).toBe(true);
    expect(complexRight.data).toEqual({ foo: 'hello', bar: 123 });
  });

  it('should work in a function', () => {
    const divide = (a: number, b: number): Either<string, number> => {
      if (b === 0) {
        return Left('Division by zero');
      }
      return Right(a / b);
    };

    const result1 = divide(10, 2);
    const result2 = divide(10, 0);

    expect(result1.isRight()).toBe(true);
    expect(result1.data).toBe(5);

    expect(result2.isLeft()).toBe(true);
    expect(result2.data).toBe('Division by zero');
  });
});

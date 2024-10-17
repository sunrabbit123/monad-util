export class Result<T, E extends Error> {
  readonly inner:
    | {
        value: T;
        isOk: true;
      }
    | {
        value: E;
        isOk: false;
      };

  constructor(result: { isOk: true; value: T } | { isOk: false; value: E }) {
    this.inner = result;
  }

  isOk(): this is Result<T, never> {
    return this.inner.isOk;
  }

  isErr(): this is Result<never, E> {
    return !this.isOk();
  }

  map<U>(f: (t: T) => U): Result<U, E> {
    if (this.isOk()) {
      return Ok(f(this.inner.value));
    }
    return Err(this.inner.value as E);
  }

  mapOr<U>(default_: U, f: (t: T) => U): U {
    if (this.isOk()) {
      return f(this.inner.value);
    }
    return default_;
  }

  mapOrElse<U>(f: (e: E) => U, g: (t: T) => U): U {
    if (this.isOk()) {
      return g(this.inner.value);
    }
    return f(this.inner.value as E);
  }

  mapErr<U extends Error>(f: (e: E) => U): Result<T, U> {
    if (this.isOk()) {
      return Ok(this.inner.value);
    }
    return Err(f(this.inner.value as E));
  }

  inspect(f: (t: T) => void): void {
    if (this.isOk()) {
      f(this.inner.value);
    }
  }

  inspectErr(f: (e: E) => void): void {
    if (this.isErr()) {
      f(this.inner.value);
    }
  }

  expect(message: string): T {
    if (this.isOk()) {
      return this.inner.value;
    }
    throw new Error(message);
  }

  unwrap(): T {
    return this.expect('Result was Err');
  }

  unwrapOrDefault(default_: T): T {
    if (this.isOk()) {
      return this.inner.value;
    }
    return default_;
  }

  expectErr(message: string): E {
    if (this.isErr()) {
      return this.inner.value;
    }
    throw new Error(message);
  }

  unwrapErr(): E {
    return this.expectErr('Result was Ok');
  }

  and<U>(res: Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return res;
    }
    return Err(this.inner.value as E);
  }

  andThen<U>(f: (t: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return f(this.inner.value);
    }
    return Err(this.inner.value as E);
  }

  or<U extends Error>(res: Result<T, U>): Result<T, U> {
    if (this.isOk()) {
      return Ok(this.inner.value);
    }
    return res;
  }

  orElse<U extends Error>(f: (e: E) => Result<T, U>): Result<T, U> {
    if (this.isOk()) {
      return Ok(this.inner.value);
    }
    return f(this.inner.value as E);
  }

  unwrapOr(default_: T): T {
    if (this.isOk()) {
      return this.inner.value;
    }
    return default_;
  }

  unwrapOrElse(f: (e: E) => T): T {
    if (this.isOk()) {
      return this.inner.value;
    }
    return f(this.inner.value as E);
  }
}

export const Ok = <T, E extends Error = Error>(value: T): Result<T, E> => {
  return new Result<T, E>({ value, isOk: true });
};

export const Err = <E extends Error, T>(value: E): Result<T, E> => {
  return new Result<T, E>({ value, isOk: false });
};

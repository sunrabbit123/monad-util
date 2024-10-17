interface EitherInterface {
  isLeft(): boolean;
  isRight(): boolean;
}

class _Left<T> implements EitherInterface {
  data: T;

  constructor(data: T) {
    this.data = data;
  }

  isLeft(): this is _Left<T> {
    return true;
  }
  isRight(): false {
    return false;
  }
}

class _Right<T> implements EitherInterface {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
  isLeft(): false {
    return false;
  }
  isRight(): this is _Right<T> {
    return true;
  }
}

export type Either<L, R> = _Left<L> | _Right<R>;
export const Left = <T>(data: T) => new _Left(data);
export const Right = <T>(data: T) => new _Right(data);

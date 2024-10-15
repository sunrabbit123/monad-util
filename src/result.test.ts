import { describe, it, expect } from 'vitest';
import { Result, Ok, Err } from './result';

describe('Result', () => {
  
  it('isOk와 isErr', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.isOk()).toBe(true);
    expect(ok.isErr()).toBe(false);
    expect(err.isOk()).toBe(false);
    expect(err.isErr()).toBe(true);
  });

  it('map', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.map(x => x * 2).unwrap()).toBe(10);
    expect(err.map(x => x * 2).isErr()).toBe(true);
  });

  it('mapOr', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.mapOr(0, x => x * 2)).toBe(10);
    expect(err.mapOr(0, x => x * 2)).toBe(0);
  });

  it('mapOrElse', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.mapOrElse(() => 0, x => x * 2)).toBe(10);
    expect(err.mapOrElse(() => 0, x => x * 2)).toBe(0);
  });

  it('unwrap과 unwrapErr', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.unwrap()).toBe(5);
    expect(() => err.unwrap()).toThrow('Result was Err');
    expect(() => ok.unwrapErr()).toThrow('Result was Ok');
    expect(err.unwrapErr().message).toBe('에러');
  });

  it('and와 andThen', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.and(Ok(10)).unwrap()).toBe(10);
    expect(err.and(Ok(10)).isErr()).toBe(true);
    expect(ok.andThen(x => Ok(x * 2)).unwrap()).toBe(10);
    expect(err.andThen(x => Ok(x * 2)).isErr()).toBe(true);
  });

  it('or와 orElse', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.or(Ok(10)).unwrap()).toBe(5);
    expect(err.or(Ok(10)).unwrap()).toBe(10);
    expect(ok.orElse(() => Ok(10)).unwrap()).toBe(5);
    expect(err.orElse(() => Ok(10)).unwrap()).toBe(10);
  });

  it('mapErr', () => {
    const ok: Result<number, Error> = Ok(5);
    const err: Result<number, Error> = Err(new Error('에러'));

    expect(ok.mapErr(e => new Error(`새 ${e.message}`)).isOk()).toBe(true);
    expect(err.mapErr(e => new Error(`새 ${e.message}`)).unwrapErr().message).toBe('새 에러');
  });

  it('inspect', () => {
    const ok: Result<number, Error> = Ok(5);
    let inspected = 0;
    ok.inspect(v => { inspected = v; });
    expect(inspected).toBe(5);

    const err: Result<number, Error> = Err(new Error('에러'));
    err.inspect(v => { inspected = v; });
    expect(inspected).toBe(5); // 에러인 경우 inspect가 호출되지 않음
  });

  it('inspectErr', () => {
    const ok: Result<number, Error> = Ok(5);
    let inspected = '';
    ok.inspectErr(e => { inspected = e.message; });
    expect(inspected).toBe('');

    const err: Result<number, Error> = Err(new Error('에러'));
    err.inspectErr(e => { inspected = e.message; });
    expect(inspected).toBe('에러');
  });

  it('expect', () => {
    const ok: Result<number, Error> = Ok(5);
    expect(ok.expect('실패')).toBe(5);

    const err: Result<number, Error> = Err(new Error('에러'));
    expect(() => err.expect('실패')).toThrow('실패');
  });

  it('unwrapOrDefault', () => {
    const ok: Result<number, Error> = Ok(5);
    expect(ok.unwrapOrDefault(10)).toBe(5);

    const err: Result<number, Error> = Err(new Error('에러'));
    expect(err.unwrapOrDefault(10)).toBe(10);
  });

  it('expectErr', () => {
    const ok: Result<number, Error> = Ok(5);
    expect(() => ok.expectErr('실패')).toThrow('실패');

    const err: Result<number, Error> = Err(new Error('에러'));
    expect(err.expectErr('실패').message).toBe('에러');
  });

  it('unwrapOr', () => {
    const ok: Result<number, Error> = Ok(5);
    expect(ok.unwrapOr(10)).toBe(5);

    const err: Result<number, Error> = Err(new Error('에러'));
    expect(err.unwrapOr(10)).toBe(10);
  });

  it('unwrapOrElse', () => {
    const ok: Result<number, Error> = Ok(5);
    expect(ok.unwrapOrElse(() => 10)).toBe(5);

    const err: Result<number, Error> = Err(new Error('에러'));
    expect(err.unwrapOrElse(() => 10)).toBe(10);
  });
});

import { isDev, isFunction } from '../../utils';
import { useMemo, useRef } from 'react';

type noop = (this: unknown, ...args: unknown[]) => unknown;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

export default function useMemoizedFn<T extends noop>(fn: T) {
  if (isDev()) {
    if (!isFunction(fn)) {
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }
  const fnRef = useRef<T>(fn);
  const memoizedRef = useRef<PickFunction<T>>(null);
  fnRef.current = useMemo(() => fn, [fn]);

  if (!memoizedRef.current) {
    memoizedRef.current = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      return fnRef.current.apply(this, args);
    } as PickFunction<T>;
  }

  return memoizedRef.current as PickFunction<T>;
}

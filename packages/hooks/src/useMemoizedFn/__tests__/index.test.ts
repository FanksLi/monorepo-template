import { renderHook } from '@testing-library/react';
import useMemoizedFn from '..';

describe('useMemoizedFn', () => {
  it('diff callback fn', () => {
    const { result, rerender } = renderHook(() => {
      const fn = useMemoizedFn(() => 1);
      return fn;
    });
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});

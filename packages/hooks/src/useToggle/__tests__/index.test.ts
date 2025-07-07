import useToggle from '../index';
import { renderHook, act } from '@testing-library/react';

describe('useToggle', () => {
  it('should hook work toggle', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
  });
  it('should hook work set', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[1].set(false);
    });
    expect(result.current[0]).toBe(false);
  });
  it('should hook work setLeft', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1].setLeft();
    });
    expect(result.current[0]).toBe(false);
  });
  it('should hook work setRight', () => {
    const { result } = renderHook(() => useToggle(true, false));

    act(() => {
      result.current[1].setRight();
    });
    expect(result.current[0]).toBe(false);
  });
});

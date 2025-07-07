import { renderHook, act } from '@testing-library/react';
import useLocalStorageState from '..';

describe('useLocalStorageState', () => {
  it('should be defined', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('key', {
        defaultValue: 'value',
      }),
    );
    const value = result.current.value;
    expect(value).toBe('value');
  });
  it('update value', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('key', {
        defaultValue: 'value',
      }),
    );
    act(() => {
      result.current.update('newValue');
    });
    expect(result.current.value).toBe('newValue');
  });
  it('deleteValue value', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('key', {
        defaultValue: 'value',
      }),
    );
    act(() => {
      result.current.deleteValue();
    });
    expect(result.current.value).toBe(undefined);
  });
});

import { useState } from 'react';
import { isFunction } from '../../utils';

export interface Options<T> {
  defaultValue?: T;
  deserialize?: (value: string) => T;
  serialize?: (value: T) => string;
  onError?: (error: Error) => void;
}
export default function createUseLocalStorageState(getStorage: () => Storage) {
  function useLocalStorageState<T>(key: string, options?: Options<T>) {
    let storage: Storage;
    const { onError } = options || {};

    try {
      storage = getStorage();
    } catch (error: unknown) {
      onError?.(error as Error);
    }

    function serialize(value: T): string {
      try {
        if (options?.serialize) {
          return options.serialize(value);
        }
        return JSON.stringify(value);
      } catch (error: unknown) {
        onError?.(error as Error);
      }
    }

    function deserialize(value: string): T {
      try {
        if (options?.deserialize) {
          return options.deserialize(value);
        }
        return JSON.parse(value);
      } catch (error: unknown) {
        onError?.(error as Error);
      }
    }

    function getStorageValue() {
      try {
        const value = storage.getItem(key);
        if (value) {
          return deserialize(value);
        }
      } catch (error: unknown) {
        onError?.(error as Error);
      }
    }

    const [state, setState] = useState<T>(() => {
      const storageValue = getStorageValue();
      return storageValue !== undefined ? storageValue : (options?.defaultValue as T);
    });

    function update(value: T | ((prevState: T) => T)) {
      if (isFunction(value)) {
        const newState: T = (value as (prevState: T) => T)(state);
        storage.setItem(key, serialize(newState));
        setState(newState);
        return;
      }
      storage.setItem(key, serialize(value as T));
      setState(value);
    }

    function deleteValue() {
      storage.removeItem(key);
      setState(undefined as T);
    }

    return {
      value: state,
      update,
      deleteValue,
    };
  }
  return useLocalStorageState;
}

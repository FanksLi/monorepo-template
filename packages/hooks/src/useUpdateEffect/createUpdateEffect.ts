import { useEffect, useLayoutEffect, useRef } from 'react';

type EffectType = typeof useEffect | typeof useLayoutEffect;

const createUpdateEffect: (hook: EffectType) => EffectType = (hook) => (effect, deps) => {
  const isMounted = useRef(false);

  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default createUpdateEffect;

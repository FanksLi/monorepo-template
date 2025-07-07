import { useEffect, useState } from 'react';
import useMemoizedFn from '..';
export default function Dome() {
  const [count, setCount] = useState(0);

  const memoizedFn = useMemoizedFn(() => {
    console.log('count:', count);
  });
  return (
    <div>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>

      <Child onClick={memoizedFn} />
    </div>
  );
}

function Child(props: { onClick: () => void }) {
  const [count2, setCount2] = useState(0);
  useEffect(() => {
    setCount2(count2 + 1);
  }, [props.onClick]);

  return (
    <div>
      <div>count2: {count2}</div>
    </div>
  );
}

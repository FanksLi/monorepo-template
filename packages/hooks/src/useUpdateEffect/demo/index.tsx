import { useEffect, useState } from 'react';
import useUpdateEffect from '..';
export default function Dome() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    setCount3(count + 1);
  }, [count]);
  useUpdateEffect(() => {
    setCount2(count2 + 1);
  }, [count]);
  return (
    <div>
      <div>useUpdateEffect: {count2}</div>
      <div>useEffect: {count3}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}

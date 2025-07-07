import useLocalStorageState from '..';

export default function Demo() {
  const { value, update } = useLocalStorageState<number | undefined>('dome1');

  return (
    <div>
      <div>dome1</div>
      <div>value: {value}</div>
      <button onClick={() => update(Math.random())}>更新</button>
    </div>
  );
}

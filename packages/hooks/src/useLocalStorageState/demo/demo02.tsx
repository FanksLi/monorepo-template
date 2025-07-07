import useLocalStorageState from '..';

export default function Demo() {
  const { value, update } = useLocalStorageState<number | undefined>('dome2', {
    defaultValue: 10,
  });

  function handleClick(v: number) {
    update(v + 1);
  }
  return (
    <div>
      <div>dome1</div>
      <div>value: {value}</div>
      <button onClick={() => handleClick(value)}>自增</button>
    </div>
  );
}

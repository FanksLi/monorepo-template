import useLocalStorageState from '..';
import dayjs from 'dayjs';

export default function Demo() {
  const { value, update, deleteValue } = useLocalStorageState<number>('dome3', {
    defaultValue: Date.now(),
    serialize: handleSerialize,
    deserialize: handledeSerialize,
  });

  function handleSerialize(v: number) {
    return dayjs(v).valueOf().toString();
  }

  function handledeSerialize(v: string) {
    return dayjs(v).valueOf();
  }

  function handleClick(v: number = Date.now()) {
    update(v + 60000);
  }
  return (
    <div>
      <div>dome3</div>
      <div>time: {dayjs(value).format('YYYY-MM-DD HH:mm')}</div>
      <button onClick={() => handleClick(value)}>自增</button>
      <button onClick={() => deleteValue()}>清除</button>
    </div>
  );
}

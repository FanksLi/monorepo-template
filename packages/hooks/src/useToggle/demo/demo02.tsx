import useToggle from '../index';

export default function Demo() {
  const [text, actions] = useToggle('hello', 'world');
  return (
    <div>
      <div>text: {text}</div>
      <button onClick={actions.toggle}>Toggle</button>
      <button onClick={actions.setRight}>setRight</button>
      <button onClick={actions.setLeft}>setLeft</button>
    </div>
  );
}

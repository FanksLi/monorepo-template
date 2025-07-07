import useToggle from '../index';

export default function Demo() {
  const [isToggled, actions] = useToggle(false);
  return (
    <div>
      <div>isToggled: {isToggled ? 'true' : 'false'}</div>
      <button onClick={actions.toggle}>Toggle</button>
    </div>
  );
}

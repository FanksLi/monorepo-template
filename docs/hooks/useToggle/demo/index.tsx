import { useToggle } from '/packages/hooks/src/index.ts';

export default function Demo() {
  const [isToggled, toggle] = useToggle(false);
  return (
    <div>
      <div>isToggled: {isToggled ? 'true' : 'false'}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

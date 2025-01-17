import { NavigationItems } from '../Navigation/NavigationItems/NavigationItems';
import './Toolbar.sass';

export function Toolbar() {
  return (
    <header className="Toolbar">
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
}

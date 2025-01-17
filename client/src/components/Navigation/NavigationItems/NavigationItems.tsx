import { NavigationItem } from './NavigationItem/NavigationItem';
import './NavigationItems.sass';

export function NavigationItems() {
  return (
    <ul className="NavigationItems">
      <NavigationItem to="/">News</NavigationItem>
    </ul>
  );
}

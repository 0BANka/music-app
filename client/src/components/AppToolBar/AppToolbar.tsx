import { Header } from 'antd/es/layout/layout';

import './AppToolBar.sass';

export function AppToolbar() {
  return (
    <Header className="app-toolbar-header">
      <nav className="nav-container">
        <ul className="nav-links">
          <div className="demo-logo">Music App</div>
        </ul>
      </nav>
    </Header>
  );
}

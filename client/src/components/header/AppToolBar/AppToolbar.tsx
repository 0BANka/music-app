import { Header } from 'antd/es/layout/layout';
import { AuthModal } from '@/components/AuthModal/AuthModal';
import Link from 'next/link';

import './AppToolBar.sass';

export function AppToolbar() {
  return (
    <Header className="app-toolbar-header">
      <nav className="nav-container">
        <ul className="nav-links">
          <Link href="/" className="demo-logo">
            Music App
          </Link>
          <AuthModal type="register" />
          <AuthModal type="login" />
        </ul>
      </nav>
    </Header>
  );
}

import { Header } from 'antd/es/layout/layout';
import { useAppSelector } from '@/store/hooks';
import { AuthModal } from '@/components/AuthModal/AuthModal';
import Link from 'next/link';

import './AppToolBar.sass';

export function AppToolbar() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Header className="app-toolbar-header">
      <nav className="nav-container">
        <ul className="nav-links">
          <Link href="/" className="demo-logo">
            Music App
          </Link>
          {!user?.token ? (
            <>
              <AuthModal type="register" />
              <AuthModal type="login" />
            </>
          ) : (
            <span className="profile" title="My profile">
              Hello, {user.username}!
            </span>
          )}
        </ul>
      </nav>
    </Header>
  );
}

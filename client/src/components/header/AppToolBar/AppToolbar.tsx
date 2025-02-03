import Link from 'next/link';
import { Header } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/features/userSlice';
import { AuthModal } from '@/components/AuthModal/AuthModal';

import './AppToolBar.sass';

export function AppToolbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

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
            <>
              <div className="menu-items">
                <span className="profile" title="My profile">
                  Hello, {user.username}!
                </span>
                <span className="logout" title="Logout" onClick={logoutHandler}>
                  Logout
                </span>
              </div>
              <div className="menu-items">
                <Link href="/tracks-history" className="menu-link">
                  History
                </Link>
              </div>
              <div className="menu-items">
                <Link href="/artists/add" className="menu-link">
                  Add artist
                </Link>
                <Link href="/albums/add" className="menu-link">
                  Add album
                </Link>
                <Link href="/tracks/add" className="menu-link">
                  Add track
                </Link>
              </div>
              {user?.role === 'admin' && (
                <div className="menu-items">
                  <Link href="/admin-panel" className="menu-link">
                    Admin panel
                  </Link>
                </div>
              )}
            </>
          )}
        </ul>
      </nav>
    </Header>
  );
}

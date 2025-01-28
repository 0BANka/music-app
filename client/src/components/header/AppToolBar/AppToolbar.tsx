import { Header } from 'antd/es/layout/layout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthModal } from '@/components/AuthModal/AuthModal';
import Link from 'next/link';

import './AppToolBar.sass';
import { logoutUser } from '@/features/userSlice';

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
              <span className="profile" title="My profile">
                Hello, {user.username}!
              </span>
              <Link href="/tracks-history" className="history-link">
                History
              </Link>
              <span className="logout" title="Logout" onClick={logoutHandler}>
                Logout
              </span>
            </>
          )}
        </ul>
      </nav>
    </Header>
  );
}

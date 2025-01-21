import { Menu, MenuProps } from 'antd';
import { AuthModal } from '@/components/AuthModal/AuthModal';

export function GuestMenu() {
  const items: MenuProps['items'] = [
    {
      label: <AuthModal type="register" />,
      key: 'register',
    },
    {
      label: <AuthModal type="login" />,
      key: 'login',
    },
  ];

  return (
    <Menu
      className="guest-menu"
      mode="horizontal"
      items={items}
      style={{ flex: 1, minWidth: 0 }}
      selectable={false}
    />
  );
}

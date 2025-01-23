'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { message } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { AuthModal } from '@/components/AuthModal/AuthModal';

export default function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user?.token === undefined) {
      messageApi.open({
        type: 'warning',
        content: 'Please login!',
      });
    } else if (user?.token) {
      redirect('/');
    }
  }, [messageApi, user?.token]);

  return (
    <>
      {contextHolder}
      <AuthModal type="login" isOpen={true} hideLink />
    </>
  );
}

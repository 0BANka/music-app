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
    const displayWarning = () => {
      messageApi.open({
        type: 'warning',
        content: 'Please login!',
      });
    };

    if (!user?.token) {
      displayWarning();
    } else {
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

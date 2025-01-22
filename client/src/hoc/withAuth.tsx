'use client';

import { redirect } from 'next/navigation';
import { ElementType, useEffect } from 'react';
import { message } from 'antd';
import { useAppSelector } from '@/store/hooks';

export const withAuth = (
  WrappedComponent: ElementType,
  resultMessage: boolean = false,
) => {
  return function WithAuth(props: object) {
    const [messageApi, contextHolder] = message.useMessage();
    const { user } = useAppSelector((state) => state.user);

    const displaySuccess = () => {
      messageApi.open({
        type: 'success',
        content: 'Success!',
      });
    };

    const displayError = () => {
      messageApi.open({
        type: 'error',
        content: 'You are not authorized',
      });
    };

    useEffect(() => {
      if (!user && !resultMessage) {
        redirect('/login');
      } else if (!user && resultMessage) {
        displayError();
      } else if (user && resultMessage) {
        displaySuccess();
      }
    });

    if (!user && !resultMessage) return null;

    return (
      <>
        {contextHolder}
        <WrappedComponent {...props} />
      </>
    );
  };
};

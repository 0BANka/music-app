'use client';

import { redirect } from 'next/navigation';
import { ElementType, useEffect } from 'react';
import { Alert } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Role } from '@/interfaces/IUser';

export const withAuth = (WrappedComponent: ElementType, role: Role) => {
  return function WithAuth(props: object) {
    const { user, loading } = useAppSelector((state) => state.user);

    useEffect(() => {
      if (!user && !loading) {
        redirect('/login');
      }
    });

    if (!user) {
      return null;
    }

    return loading ? (
      <Loader />
    ) : role === user?.role ? (
      <WrappedComponent {...props} />
    ) : (
      <>
        <Alert
          message="У вас нет доступа к данной странице. Обратитесь к администратору системы"
          type="warning"
        />
      </>
    );
  };
};

'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAppDispatch } from '@/store/hooks';
import { clearErrors } from '@/features/userSlice';
import { RegisterForm } from '../RegisterForm/RegisterForm';

import './AuthModal.sass';

interface Props {
  type: 'register' | 'login';
  isOpen?: boolean;
}

export function AuthModal({ type, isOpen }: Props) {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(isOpen || false);
  const [form] = useForm();

  const onOk = () => {
    form.submit();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    form.resetFields();
    dispatch(clearErrors());
    setIsModalOpen(false);
  };

  const buttonText = type === 'register' ? 'Register' : 'Login';
  const title = type === 'register' ? 'Registration' : 'Authorization';

  return (
    <>
      <span className="auth-modal-button" onClick={showModal}>
        {buttonText}
      </span>
      <Modal
        okType="default"
        title={title}
        open={isModalOpen}
        okText={buttonText}
        onOk={onOk}
        onCancel={onCancel}
        okButtonProps={{
          className: 'auth-modal-ok-button',
        }}
      >
        <RegisterForm form={form} closeModal={onCancel} />
      </Modal>
    </>
  );
}

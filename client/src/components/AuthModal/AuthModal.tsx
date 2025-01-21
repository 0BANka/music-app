'use client';

import { useState } from 'react';
import { Flex, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RegisterForm } from '../RegisterForm/RegisterForm';

interface Props {
  type: 'register' | 'login';
  isOpen?: boolean;
}

export function AuthModal({ type, isOpen }: Props) {
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
    setIsModalOpen(false);
  };

  const buttonText = type === 'register' ? 'Register' : 'Login';
  const title = type === 'register' ? 'Registration' : 'Authorization';

  return (
    <>
      <a onClick={showModal}>{buttonText}</a>
      <Modal
        title={title}
        open={isModalOpen}
        okText={buttonText}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Flex gap="middle" align="start" justify="center">
          <RegisterForm form={form} closeModal={onCancel} />
        </Flex>
      </Modal>
    </>
  );
}

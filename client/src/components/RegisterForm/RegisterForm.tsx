import { useEffect, useState } from 'react';
import { Alert, Form, FormInstance, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, UserRequest } from '@/features/userSlice';

import './RegisterForm.sass';

interface Props {
  form: FormInstance;
  closeModal: () => void;
}

export function RegisterForm({ form, closeModal }: Props) {
  const dispatch = useAppDispatch();
  const { registerError, loading } = useAppSelector((state) => state.user);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onFinish = (values: UserRequest) => {
    setIsFormSubmitted(true);
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (!loading && !registerError && isFormSubmitted) {
      form.resetFields();
      closeModal();
    }
  }, [registerError, loading, isFormSubmitted]);

  return (
    <Form form={form} name="registration-form" onFinish={onFinish}>
      {registerError ? (
        <div className="register-error-container">
          <Alert type="error" message={registerError} />{' '}
        </div>
      ) : null}
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Username"
          className="site-form-item-icon username-register-input"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          className="site-form-item-icon"
        />
      </Form.Item>
    </Form>
  );
}

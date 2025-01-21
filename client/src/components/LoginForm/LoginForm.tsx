import { useEffect, useState } from 'react';
import { Alert, Checkbox, Flex, Form, FormInstance, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, UserRequest } from '@/features/userSlice';

interface Props {
  form: FormInstance;
  closeModal: () => void;
}

export function LoginForm({ form, closeModal }: Props) {
  const dispatch = useAppDispatch();
  const { loginError, loading } = useAppSelector((state) => state.user);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onFinish = (values: UserRequest) => {
    dispatch(loginUser(values));
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    if (!loading && !loginError && isFormSubmitted) {
      form.resetFields();
      closeModal();
    }
  }, [loginError, loading, isFormSubmitted]);

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {loginError ? (
        <div className="auth-error-container">
          <Alert type="error" message={loginError} />
        </div>
      ) : null}
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="" className="login-form-forgot">
            Forgot password
          </a>
        </Flex>
      </Form.Item>
    </Form>
  );
}

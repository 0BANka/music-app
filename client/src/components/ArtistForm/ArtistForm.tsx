import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, Button, Flex, Form, Input, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks';
import { createArtist } from '@/features/artistsSlice';

import './ArtistForm.sass';

export function ArtistForm() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState([]);
  const router = useRouter();

  const onFinish = async (values: { [key: string]: string }) => {
    const formData: FormData = new FormData();
    for (const name in values) {
      const value = values[name];

      formData.append(name, name === 'photo' ? value : value.trim());
    }

    const response = await dispatch(createArtist(formData)).unwrap();

    if (response.id) {
      setError([]);
      router.push('/');
    } else {
      setError(response);
    }
  };

  return (
    <Flex justify="center">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        name="artist-create"
        className="artist-create-form"
      >
        {error.length > 0 && (
          <>
            <div className="error-container">
              {error.map((message, index) => (
                <Alert type="error" message={message} key={index} />
              ))}
            </div>
          </>
        )}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input artist name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="info"
          label="Info"
          rules={[{ required: true, message: 'Please input artist info!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Photo"
          getValueFromEvent={({ file }) => file.originFileObj}
        >
          <Upload
            accept="image/png, image/jpeg, image/gif"
            name="photo"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label={null}>
          <Space>
            <Button htmlType="submit">Submit</Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Flex>
  );
}

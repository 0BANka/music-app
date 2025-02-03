import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createAlbum } from '@/features/albumsSlice';
import { fetchArtists } from '@/features/artistsSlice';

import './AlbumForm.sass';

export function AlbumForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { artists, loading } = useAppSelector((state) => state.artists);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists());
    }
  }, [dispatch, artists.length]);

  const onFinish = async (values: { [key: string]: string }) => {
    const formData: FormData = new FormData();
    for (const name in values) {
      const value = values[name];

      console.log(name, value);

      switch (name) {
        case 'artistId':
          formData.append(name, String(value));
          break;
        case 'image':
          formData.append(name, value);
          break;
        case 'year':
          formData.append(name, new Date(value).getFullYear().toString());
          break;
        default:
          formData.append(name, value.trim());
      }
    }

    const response = await dispatch(createAlbum(formData)).unwrap();

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
        name="album-create"
        className="create-form"
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
          rules={[{ required: true, message: 'Please input album name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: 'Please input album year!' }]}
        >
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item name="artistId" label="Artist">
          <Select loading={loading} placeholder="Please select artist">
            {artists.map((artist) => (
              <Select.Option key={artist.id} value={artist.id}>
                {artist.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          getValueFromEvent={({ file }) => file.originFileObj}
        >
          <Upload
            accept="image/png, image/jpeg, image/gif"
            name="image"
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

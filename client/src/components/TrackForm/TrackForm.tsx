import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAlbums } from '@/features/albumsSlice';
import { fetchArtists } from '@/features/artistsSlice';
import { createTrack } from '@/features/tracksSlice';
import { IAlbum } from '@/interfaces/IAlbum';

export function TrackForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { artists, artistsLoading } = useAppSelector((state) => state.artists);
  const { albums, albumsLoading } = useAppSelector((state) => state.albums);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [albumsData, setAlbumsData] = useState<IAlbum[]>([]);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists());
    }
    setAlbumsData([]);
    dispatch(fetchAlbums(selectedArtist));
  }, [dispatch, artists.length, setSelectedArtist, selectedArtist]);

  useEffect(() => {
    if (albums.length > 0 && Array.isArray(albums)) {
      setAlbumsData(albums);
    } else {
      setAlbumsData([]);
    }
  }, [albums]);

  const onFinish = async (values: { [key: string]: string }) => {
    const formData: FormData = new FormData();
    for (const name in values) {
      const value = values[name];

      switch (name) {
        case 'albumId':
          formData.append(name, String(value));
          break;
        case 'track':
          formData.append(name, value);
          break;
        case 'artistId':
          break;
        case 'youtubeLink':
          if (String(value).trim() && value !== undefined) {
            formData.append(name, String(value).trim());
          } else {
            formData.append(name, '');
          }
          break;
        default:
          formData.append(name, String(value).trim());
      }
    }

    const response = await dispatch(createTrack(formData)).unwrap();

    if (response.id) {
      setError([]);
      router.push('/');
    } else {
      if (!Array.isArray(response)) {
        setError([response]);
      } else {
        setError(response);
      }
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
        {error.length > 0 && Array.isArray(error) && (
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
          rules={[{ required: true, message: 'Please input track name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="trackNumber"
          label="Track Number"
          rules={[{ required: true, message: 'Please input track number!' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="artistId"
          label="Artist"
          rules={[{ required: true, message: 'You must select an artist!' }]}
        >
          <Select
            loading={artistsLoading}
            placeholder="Please select artist"
            onChange={(value) => setSelectedArtist(value)}
          >
            {Array.isArray(artists) &&
              artists.length > 0 &&
              artists.map((artist) => (
                <Select.Option key={artist.id} value={artist.id}>
                  {artist.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="albumId"
          label="Album"
          rules={[{ required: true, message: 'You must select an album!' }]}
        >
          <Select loading={albumsLoading} placeholder="Please select album">
            {selectedArtist &&
              Array.isArray(albumsData) &&
              albumsData.length > 0 &&
              albumsData.map((album) => (
                <Select.Option key={album.id} value={album.id}>
                  {album.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="track"
          label="Track"
          getValueFromEvent={({ file }) => file.originFileObj}
        >
          <Upload
            accept="audio/mp3, audio/wav, audio/ogg"
            name="track"
            listType="text"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Track</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <Input placeholder="example: 03:20" />
        </Form.Item>
        <Form.Item name="youtubeLink" label="Youtube Link">
          <Input />
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

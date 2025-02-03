import { useEffect } from 'react';
import { Button, Space, Table, TableProps, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IEntityData } from '@/interfaces/IEntityData';
import { fetchEntities } from '@/features/entitiesSlice';
import { Loader } from '../Loader/Loader';
import { deleteTrack, publishTrack } from '@/features/tracksSlice';
import { deleteArtist, publishArtist } from '@/features/artistsSlice';
import { deleteAlbum, publishAlbum } from '@/features/albumsSlice';

import './AdminTable.sass';

export function AdminTable() {
  const dispatch = useAppDispatch();
  const { entitiesData, loading } = useAppSelector((state) => state.entities);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch, user?.token]);

  const refreshData = () => {
    dispatch(fetchEntities());
  };

  const handlePublish = async (id: string, type: string) => {
    switch (type) {
      case 'track':
        await dispatch(publishTrack(id)).unwrap();
        break;
      case 'album':
        await dispatch(publishAlbum(id)).unwrap();
        break;
      case 'artist':
        await dispatch(publishArtist(id)).unwrap();
        break;
      default:
        break;
    }
    refreshData();
  };

  const handleDelete = async (id: string, type: string) => {
    switch (type) {
      case 'track':
        await dispatch(deleteTrack(id)).unwrap();
        break;
      case 'album':
        await dispatch(deleteAlbum(id)).unwrap();
        break;
      case 'artist':
        await dispatch(deleteArtist(id)).unwrap();
        break;
      default:
        break;
    }
    refreshData();
  };

  const columns: TableProps<IEntityData>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="#333">{type.toUpperCase()}</Tag>,
    },
    {
      title: 'Created by',
      dataIndex: 'user',
      key: 'user',
      render: (user) => <Tag color="#333">{user}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'isPublish',
      key: 'isPublish',
      render: (isPublish: boolean) => (
        <Tag
          color={isPublish ? '#333' : '#fff'}
          style={{
            color: isPublish ? '#fff' : '#000',
            border: isPublish ? '#333' : '1px solid #333',
          }}
        >
          {isPublish ? 'Published' : 'Unpublished'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {!record.isPublish && (
            <Button onClick={() => handlePublish(record.id, record.type)}>
              Publish
            </Button>
          )}
          <Button onClick={() => handleDelete(record.id, record.type)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="admin-table">
        <h1>Admin Panel</h1>
        {loading && <Loader />}
        {entitiesData.length > 0 && !loading && entitiesData[0]?.name && (
          <Table columns={columns} dataSource={entitiesData} rowKey="id" />
        )}
      </div>
    </div>
  );
}

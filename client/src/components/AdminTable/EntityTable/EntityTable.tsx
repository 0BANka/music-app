import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { IEntityData } from '@/interfaces/IEntityData';

interface Props {
  data: IEntityData[];
}

export function EntityTable({ data }: Props) {
  const dispatch = useAppDispatch();

  const handlePublish = (id: string, type: string) => {
    dispatch(publishEntity(id));
  };

  const handleDelete = (id: string, type: string) => {
    dispatch(deleteEntity(id));
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type.toUpperCase()}</Tag>,
    },
    {
      title: 'Создано пользователем',
      dataIndex: ['user', 'username'],
      key: 'username',
    },
    {
      title: 'Статус',
      dataIndex: 'isPublish',
      key: 'isPublish',
      render: (isPublish: boolean) => (
        <Tag color={isPublish ? 'green' : 'red'}>
          {isPublish ? 'Опубликовано' : 'Не опубликовано'}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: IEntityData) => (
        <Space>
          {!record.isPublish && (
            <Button type="primary" onClick={() => handlePublish(record.id)}>
              Опубликовать
            </Button>
          )}
          <Button type="default" danger onClick={() => handleDelete(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
}

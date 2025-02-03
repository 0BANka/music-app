import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IEntityData } from '@/interfaces/IEntityData';
import { fetchEntities } from '@/features/entitiesSlice';

export function AdminTable() {
  const dispatch = useAppDispatch();
  const { entitiesData } = useAppSelector((state) => state.entities);
  const { user } = useAppSelector((state) => state.user);
  const [data, setData] = useState<IEntityData[]>([]);

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch, user?.token]);

  useEffect(() => {
    if (
      entitiesData.length > 0 &&
      Array.isArray(entitiesData) &&
      entitiesData[0].name
    ) {
      setData(entitiesData);
    } else {
      setData([]);
    }
  }, [entitiesData]);

  return <Table></Table>;
}

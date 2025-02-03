export interface IEntityData {
  id: string;
  name: string;
  isPublish: boolean;
  user: string;
  type: 'track' | 'album' | 'artist';
}

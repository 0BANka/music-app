'use client';

import { AlbumForm } from '@/components/AlbumForm/AlbumForm';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function AlbumCreationPage() {
  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1 className="form-title">New album creation</h1>
          <AlbumForm />
        </div>
      </div>
    </>
  );
}

export default withAuth(AlbumCreationPage, Role.USER);

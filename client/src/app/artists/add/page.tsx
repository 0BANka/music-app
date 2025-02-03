'use client';

import { ArtistForm } from '@/components/ArtistForm/ArtistForm';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function ArtistCreationPage() {
  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1 className="form-title">New artist creation</h1>
          <ArtistForm />
        </div>
      </div>
    </>
  );
}

export default withAuth(ArtistCreationPage, Role.USER);

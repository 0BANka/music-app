'use client';

import { TrackForm } from '@/components/TrackForm/TrackForm';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function TrackCreationPage() {
  return (
    <>
      <div className="container">
        <div className="form-container">
          <h1 className="form-title">New track creation</h1>
          <TrackForm />
        </div>
      </div>
    </>
  );
}

export default withAuth(TrackCreationPage, Role.USER);

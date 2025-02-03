'use client';

import { AdminTable } from '@/components/AdminTable/AdminTable';
import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';

function AdminPanelPage() {
  return (
    <>
      <AdminTable />
    </>
  );
}

export default withAuth(AdminPanelPage, Role.ADMIN);

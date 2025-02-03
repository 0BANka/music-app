'use client';

import { withAuth } from '@/hoc/withAuth';
import { Role } from '@/interfaces/IUser';
import { TracksHistoryList } from '@/components/TracksHistoryList/TracksHistoryList';

function TracksHistoryPage() {
  return <TracksHistoryList />;
}

export default withAuth(TracksHistoryPage, Role.USER);

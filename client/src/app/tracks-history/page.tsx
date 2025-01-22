'use client';

import { TracksHistoryList } from '@/components/TracksHistoryList/TracksHistoryList';
import { withAuth } from '@/hoc/withAuth';

function TracksHistoryPage() {
  return <TracksHistoryList />;
}

export default withAuth(TracksHistoryPage);

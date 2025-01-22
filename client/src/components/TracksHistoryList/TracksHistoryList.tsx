import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function TracksHistoryList() {
  const dispatch = useAppDispatch();
  const { tracks, loading } = useAppSelector((state) => state.tracks);
  const { user } = useAppSelector((state) => state.user);
  const [data, setData] = useState<ITrack[]>([]);

  return (
    <div className="container">
      <div className="tracks-history-list-container">
        <h1 className="tracks-history-list-title">Tracks History</h1>
        {loading && <Loader />}
        {data.length > 0 &&
          data.map((element) => <TrackItem key={element.id} track={element} />)}
      </div>
    </div>
  );
}

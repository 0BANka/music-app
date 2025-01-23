import { Dropdown, MenuProps } from 'antd';
import { EllipsisOutlined, PlayCircleFilled } from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks';
import { setYoutubeModal } from '@/features/tracksSlice';
import { ITrack } from '@/interfaces/ITrack';
import { YouTubeModal } from '../YouTubeModal/YouTubeModal';

import './TrackItem.sass';

interface Props {
  track: ITrack;
  onClickTrack: (id: string) => void;
}

export function TrackItem({ track, onClickTrack }: Props) {
  const dispatch = useAppDispatch();
  const { trackNumber, name, duration, id, youtubeLink } = track;

  const handleClick = (e: React.MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest('.youtube-modal') &&
      !(e.target as HTMLElement).closest('.ant-dropdown-menu-item')
    ) {
      onClickTrack(id);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Play on YouTube',
      key: '1',
      icon: <PlayCircleFilled />,
      onClick: () => dispatch(setYoutubeModal(true)),
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <div className="track" onClick={handleClick}>
      <div className="track-info">
        <div className="track-name-container">
          <span className="track-number">{trackNumber}</span>
          <span className="track-name">{name}</span>
        </div>
        <div className="track-actions">
          <span className="track-duration">{duration}</span>
          <Dropdown
            className="track-dropdown"
            placement="bottomLeft"
            menu={menuProps}
            trigger={['hover']}
            disabled={!youtubeLink}
          >
            <EllipsisOutlined
              className="track-ellipsis"
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
          {youtubeLink && <YouTubeModal youtubeLink={youtubeLink} />}
        </div>
      </div>
    </div>
  );
}

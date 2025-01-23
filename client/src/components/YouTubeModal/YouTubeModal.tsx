import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setYoutubeModal } from '@/features/tracksSlice';
import { Loader } from '../Loader/Loader';

interface Props {
  youtubeLink: string;
}

export function YouTubeModal({ youtubeLink }: Props) {
  const dispatch = useAppDispatch();
  const { youtubeModal } = useAppSelector((state) => state.tracks);
  const [loading, setLoading] = useState(true);

  const handleOk = () => {
    dispatch(setYoutubeModal(false));
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <Modal
        className="youtube-modal"
        title="Play on YouTube"
        open={youtubeModal}
        onCancel={handleOk}
        footer={
          <Button type="default" onClick={handleOk}>
            Close
          </Button>
        }
      >
        {loading && <Loader />}
        <iframe
          src={`https://www.youtube.com/embed/${youtubeLink}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="youtube-iframe"
          onLoad={handleIframeLoad}
          style={loading ? { display: 'none' } : {}}
        ></iframe>
      </Modal>
    </>
  );
}

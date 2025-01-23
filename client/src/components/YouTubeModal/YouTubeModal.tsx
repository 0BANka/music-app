import { Button, Modal } from 'antd';
import { useState } from 'react';

interface Props {
  youtubeLink: string;
  isOpen?: boolean;
}

export function YouTubeModal({ isOpen, youtubeLink }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen || false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        Play in YouTube
      </Button>
      <Modal title="Play in YouTube" open={isModalOpen} onOk={handleOk}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeLink}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </>
  );
}

import { useState } from 'react';
import './BackgroundVideo.css';
import video1 from '../assets/Videos/video1_sea.mp4';
import video2 from '../assets/Videos/video2_jellyfish.mp4';
import video3 from '../assets/Videos/video3_birds.mp4';
import video4 from '../assets/Videos/video4_sunset.mp4';

const videoArray = [video1, video2, video3, video4];

const BackgroundVideo = () => {
  const [videoIndex, setVideoIndex] = useState(0);

  const handleChangeBackground = () => {
    if (videoIndex > videoArray.length - 2) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };

  return (
    <>
      <video
        src={videoArray[videoIndex]}
        autoPlay
        muted
        loop
        className="background-video"
      ></video>
      <div className="black-screen"></div>
      <div
        className="change-bg-btn"
        onClick={handleChangeBackground}
      >
        Change background
      </div>
    </>
  );
};

export default BackgroundVideo;

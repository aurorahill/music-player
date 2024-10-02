import React, { useState } from 'react';
import './SongDetails.css';

const SongDetails = ({ currentMusicDetails, isAudioPlaying }) => {
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);

  //Change Shape Avatar image
  let avatarClass = ['objectFitCover', 'objectFitContain'];
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };
  return (
    <>
      <p className="music-header">{currentMusicDetails.songName}</p>
      <p className="music-artist">{currentMusicDetails.songArtist}</p>
      <img
        src={currentMusicDetails.songAvatar}
        alt="Song Avatar"
        id="song-avatar"
        onClick={handleAvatar}
        className={
          isAudioPlaying
            ? `${avatarClass[avatarClassIndex]} playing`
            : avatarClass[avatarClassIndex]
        }
      />
    </>
  );
};

export default SongDetails;

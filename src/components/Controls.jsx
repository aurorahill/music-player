import { useState, useRef } from 'react';
import './Controls.css';
import songSrc1 from '../assets/Songs/Elysian skies - Haruudu.mp3';
import songSrc2 from '../assets/Songs/Elysian embers - Top flow.mp3';
import songSrc3 from '../assets/Songs/Forest Lullaby - Music For Video.mp3';
import songSrc4 from '../assets/Songs/Cinematic ambient - Lexin Music.mp3';
import songSrc5 from '../assets/Songs/Sedative - Music For Video.mp3';
import songSrc6 from '../assets/Songs/The beat of nature - Olexy.mp3';
import songAvatar1 from '../assets/Images/image1.jpg';
import songAvatar2 from '../assets/Images/image2.jpg';
import songAvatar3 from '../assets/Images/image3.jpg';
import songAvatar4 from '../assets/Images/image4.jpg';
import songAvatar5 from '../assets/Images/image5.jpg';
import songAvatar6 from '../assets/Images/image6.jpg';

const musicAPI = [
  {
    songName: 'Elysian skies',
    songArtist: 'Haruudu',
    songSrc: songSrc1,
    songAvatar: songAvatar1,
  },
  {
    songName: 'Elysian embers',
    songArtist: 'Top flow',
    songSrc: songSrc2,
    songAvatar: songAvatar2,
  },
  {
    songName: 'Forest Lullaby',
    songArtist: 'Music For Video',
    songSrc: songSrc3,
    songAvatar: songAvatar3,
  },
  {
    songName: 'Cinematic ambient',
    songArtist: 'Lexin Music',
    songSrc: songSrc4,
    songAvatar: songAvatar4,
  },
  {
    songName: 'Sedative',
    songArtist: 'Music For Video',
    songSrc: songSrc5,
    songAvatar: songAvatar5,
  },
  {
    songName: 'The beat of nature',
    songArtist: 'Olexy',
    songSrc: songSrc6,
    songAvatar: songAvatar6,
  },
];

const Controls = ({
  setCurrentMusicDetails,
  setIsAudioPlaying,
  isAudioPlaying,
}) => {
  const [musicTotalLength, setMusicTotalLength] = useState('01 : 59');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [musicIndex, setMusicIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  //Handle times
  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalTime;
    if (isNaN(minutes) && isNaN(seconds)) {
      musicTotalTime = '00 : 00';
    } else {
      musicTotalTime = `${minutes < 10 ? `0${minutes}` : minutes} : ${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }
    setMusicTotalLength(musicTotalTime);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  //Play Audio function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
      document.getElementById('song-avatar').classList.add('playing');
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
      document.getElementById('song-avatar').classList.remove('playing');
    }
  };

  //Next&Prev Song functions
  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  return (
    <>
      <audio
        src={songSrc1}
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      <div className="music-timer-div">
        <p className="music-current-time">{musicCurrentTime}</p>
        <p className="music-total-lenght">{musicTotalLength}</p>
      </div>
      <input
        type="range"
        name="music-progress-bar"
        className="music-progress-bar"
        value={audioProgress}
        onChange={handleMusicProgressBar}
      />
      <div className="music-controlers">
        <i
          className="fa-solid fa-backward music-controler"
          onClick={handlePrevSong}
        ></i>
        <i
          className={`fa-solid ${
            isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'
          } play-btn`}
          onClick={handleAudioPlay}
        ></i>
        <i
          className="fa-solid fa-forward music-controler"
          onClick={handleNextSong}
        ></i>
      </div>
    </>
  );
};

export default Controls;

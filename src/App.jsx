import { useState } from 'react';
import './App.css';
import BackgroundVideo from './components/BackgroundVideo';
import SongDetails from './components/SongDetails';
import Controls from './components/Controls';
import songAvatar1 from './assets/Images/image1.jpg';
import songSrc1 from './assets/Songs/Elysian skies - Haruudu.mp3';

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Elysian skies',
    songArtist: 'Haruudu',
    songSrc: songSrc1,
    songAvatar: songAvatar1,
  });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <>
      <div className="container">
        <BackgroundVideo />
        <div className="music-container">
          <p className="music-player">Music player</p>
          <SongDetails
            currentMusicDetails={currentMusicDetails}
            isAudioPlaying={isAudioPlaying}
          />
          <Controls
            setCurrentMusicDetails={setCurrentMusicDetails}
            setIsAudioPlaying={setIsAudioPlaying}
            isAudioPlaying={isAudioPlaying}
          />
        </div>
      </div>
    </>
  );
}

export default App;

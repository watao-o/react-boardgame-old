import React, { useState, useEffect } from 'react';
import clickMp3 from '../assets/click.mp3'
import '../metronome.css'

const MIN_BPM = 60;
const MAX_BPM = 300;

const Metronome: React.FC = () => {
  const [bpm, setBpm] = useState<number>(120);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        const audio = new Audio(clickMp3);
        audio.volume = volume;
        audio.play();
      }, (60 / bpm) * 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [isPlaying, bpm, volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(event.target.value));
  };


  const increaseBpmPer10 = () => {
    setBpm((prevBpm) => Math.min(prevBpm + 10, MAX_BPM));
  };

  const decreaseBpmPer10 = () => {
    setBpm((prevBpm) => Math.max(prevBpm - 10, MIN_BPM));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return (
    <div className="container">
      <h1>メトロノーム</h1>
      <div>
        <button className='button' onClick={handlePlayPause}>
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
      <div>
        <label className='label'>
          BPM:
          <input
            type="number"
            value={bpm}
            onChange={handleBpmChange}
            min={MIN_BPM}
            max={MAX_BPM}
          />
        </label>
        <button className='button' onClick={increaseBpmPer10}>Increase Bpm per 10</button>
        <button className='button' onClick={decreaseBpmPer10}>Decrease Bpm per 10</button>
      </div>
      <div>
        <label className='label'>
          Volume:
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </label>
      </div>
    </div>
  )
}

export default Metronome
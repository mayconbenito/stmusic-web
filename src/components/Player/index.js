import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  MdPlayArrow,
  MdPause,
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeMute,
} from 'react-icons/md';

import Sound from 'react-sound';

import { Creators as PlayerActions } from '../../store/ducks/player';

import {
  Container,
  TrackInfo,
  TrackTexts,
  TrackName,
  ArtistName,
  TrackMiddle,
  Playing,
  Controls,
  ProgressBar,
  Progress,
  ProgressTime,
  Control,
  Volume,
  VolumeBar,
} from './styles';

import Image from '../Image';

function Player() {
  const { pause, resume, stop, prev, next } = PlayerActions;

  const player = useSelector(state => state.player);
  const dispatch = useDispatch();

  const [currentTime, setCurrentTime] = useState();
  const [duration, setDuration] = useState();
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [player.active]);

  function formatTime(millis = 0) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function handleOnPlaying({ position, duration: totalDuration }) {
    setCurrentTime(position);
    setDuration(totalDuration);
  }

  function handleVolumeChange(e) {
    setVolume(parseInt(e.target.value));
  }

  function streamUrl(youtubeId) {
    return `${process.env.REACT_APP_STREAM_URL}/yt?url=${youtubeId}`;
  }

  function handleFinishedPlaying() {
    if (player.playlist) {
      dispatch(next());
      return;
    }

    dispatch(stop());
  }

  return (
    <Container visible={player.active}>
      <div style={{ display: 'none' }}>
        <Sound
          url={streamUrl(player.active.youtubeId)}
          playStatus={player.isPlaying}
          volume={volume}
          onPlaying={handleOnPlaying}
          onFinishedPlaying={handleFinishedPlaying}
        />
      </div>

      {player.active && (
        <React.Fragment>
          <TrackInfo>
            <Image
              src={player.active.picture}
              style={{ width: 70, height: 70 }}
            />
            <TrackTexts>
              <TrackName>{player.active.name}</TrackName>
              <ArtistName>
                {player.active.artists.map(
                  (artist, index) => (index ? ', ' : '') + artist.name
                )}
              </ArtistName>
            </TrackTexts>
          </TrackInfo>

          <TrackMiddle>
            <Playing>
              {player.playlist && `Tocando: ${player.playlist.name}`}
            </Playing>
            <Controls>
              <Control onClick={() => dispatch(prev())}>
                <MdSkipPrevious size={40} color="#d99207" />
              </Control>
              <Control>
                {player.isPlaying === 'PLAYING' && (
                  <MdPause
                    size={40}
                    color="#d99207"
                    onClick={() => dispatch(pause())}
                  />
                )}
                {player.isPlaying === 'PLAYING' ||
                  ('STOPPED' && (
                    <MdPlayArrow
                      size={40}
                      color="#d99207"
                      onClick={() => dispatch(resume())}
                    />
                  ))}
              </Control>
              <Control onClick={() => dispatch(next())}>
                <MdSkipNext size={40} color="#d99207" />
              </Control>
            </Controls>
            <Progress>
              <ProgressTime>{formatTime(currentTime)}</ProgressTime>
              <ProgressBar
                value={(currentTime * 100) / duration || 0}
                max="100"
              />
              <ProgressTime>{formatTime(duration)}</ProgressTime>
            </Progress>
          </TrackMiddle>

          <Volume>
            <Control>
              <MdVolumeMute size={20} color="#d99207" />
            </Control>
            <VolumeBar
              onChange={handleVolumeChange}
              value={volume}
              type="range"
              min="0"
              max="100"
            />
          </Volume>
        </React.Fragment>
      )}
    </Container>
  );
}

export default React.memo(Player);

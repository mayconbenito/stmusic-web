import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  MdPlayArrow, MdPause, MdSkipPrevious, MdSkipNext, MdVolumeMute,
} from 'react-icons/md';

import { Player as VideoPlayer } from 'video-react';

import { Types as PlayerTypes, fetchStream } from '../../store/ducks/player';

import {
  Container,
  TrackInfo,
  TrackImage,
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

function Player() {
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [playerSrc, setPlayerSrc] = useState('https://sample-videos.com/audio/mp3/wave.mp3');

  const player = useSelector(state => state.player);
  const dispatch = useDispatch();
  const playerRef = useRef();

  function formatTime(time = 0) {
    let minutes = isNaN(Math.floor(time / 60)) ? 0 : Math.floor(time / 60);
    minutes = (minutes >= 10) ? minutes : `0${minutes}`;
    let seconds = isNaN(Math.floor(time % 60)) ? 0 : Math.floor(time % 60);
    seconds = (seconds >= 10) ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  function listener(state, prevState) {
    if (state.duration !== prevState.duration) {
      setDuration(state.duration);
    }

    setCurrentTime(state.currentTime);
  }

  useEffect(() => {
    if (player.active) {
      dispatch(fetchStream(player.active.id));
      playerRef.current.actions.play();
    }
  }, [player.active.url]);

  useLayoutEffect(() => {
    playerRef.current.subscribeToStateChange(listener);
    if (player.isPlaying) {
      playerRef.current.actions.play();
    } else {
      playerRef.current.actions.pause();
    }
  }, [player.isPlaying]);

  useLayoutEffect(() => {
    if (player.active.source !== playerSrc) {
      setPlayerSrc(player.active.source);
      playerRef.current.actions.play();
    }
  }, [player.active]);

  function handleVolumeChange(e) {
    const volume = e.target.value / 100;
    playerRef.current.volume = volume;
  }

  return (
    <Container visible={player.active}>
      <div style={{ display: 'none' }}>
        <VideoPlayer
          volume={0.5}
          ref={playerRef}
          src={player.active.url || playerSrc}
          autoPlay={false}
        />
      </div>

      { player.active && (
        <React.Fragment>
          <TrackInfo>
            <TrackImage src={player.active.picture} />
            <TrackTexts>
              <TrackName>{player.active.name}</TrackName>
              <ArtistName>{player.active.artist.name}</ArtistName>
            </TrackTexts>
          </TrackInfo>

          <TrackMiddle>
            <Playing>
              {player.playlist && `Tocando: ${player.playlist.name}`}
            </Playing>
            <Controls>
              <Control>
                <MdSkipPrevious size={40} color="#d99207" />
              </Control>
              <Control onClick={() => dispatch({ type: PlayerTypes.CHANGE_STATUS })}>
                {player.isPlaying ? (
                  <MdPause size={40} color="#d99207" />
                ) : (
                  <MdPlayArrow size={40} color="#d99207" />
                )}
              </Control>
              <Control>
                <MdSkipNext size={40} color="#d99207" />
              </Control>
            </Controls>
            <Progress>
              <ProgressTime>{formatTime(currentTime)}</ProgressTime>
              <ProgressBar value={(currentTime * 100) / duration} max="100" />
              <ProgressTime>{typeof duration === 'number' ? formatTime(duration) : '00:00'}</ProgressTime>
            </Progress>
          </TrackMiddle>

          <Volume>
            <Control>
              <MdVolumeMute size={20} color="#d99207" />
            </Control>
            <VolumeBar onChange={handleVolumeChange} type="range" min="0" max="100" />
          </Volume>
        </React.Fragment>
      )}
    </Container>
  );
}

export default React.memo(Player);

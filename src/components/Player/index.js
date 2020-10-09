import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdPlayArrow,
  MdPause,
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeMute,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  usePlaybackTrackChanged,
  useTrackPlayerProgress,
  usePlaybackState,
} from 'react-web-track-player';

import fallback from '../../assets/images/fallback.png';
import AppContext from '../../contexts/AppContext';
import usePersistedState from '../../hooks/usePersistedState';
import api from '../../services/api';
import { Creators as PlayerActions } from '../../store/ducks/player';
import Image from '../Image';
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

function Player() {
  const { pause, resume, prev, next } = PlayerActions;

  const appContext = useContext(AppContext);
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [playCountStatus, setPlayCountStatus] = useState(null);
  const currentTrack = usePlaybackTrackChanged();
  const currentTrackProgress = useTrackPlayerProgress();
  const playbackState = usePlaybackState();
  const [volume, setVolume] = usePersistedState('@stmusic:playerVolume', 20);

  function formatTime(seconds = 0) {
    const format = (val) => `0${Math.floor(val)}`.slice(-2);
    const minutes = (seconds % 3600) / 60;

    return [minutes, seconds % 60].map(format).join(':');
  }

  function handleVolumeChange(e) {
    setVolume(parseInt(e.target.value));
  }

  useEffect(() => {
    if (playCountStatus) {
      setPlayCountStatus(null);
    }
  }, [currentTrack?.id]);

  useEffect(() => {
    function handleSetPlayCount() {
      try {
        const percentage = Math.round(
          (currentTrackProgress.position * 100) / currentTrackProgress.duration
        );

        if (!playCountStatus && percentage >= 45) {
          setPlayCountStatus(true);
          api.post(`/app/tracks/plays/${currentTrack?.id}`);
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}
    }

    handleSetPlayCount();
  }, [
    currentTrackProgress.position,
    currentTrackProgress.duration,
    playCountStatus,
  ]);

  useEffect(() => {
    dispatch(PlayerActions.setVolume(volume / 100));
  }, [volume, player.active]);

  const showPauseButton =
    playbackState === 'STATE_PLAYING' ||
    playbackState === 'STATE_BUFFERING' ||
    playbackState === 'STATE_NONE';

  useEffect(() => {
    if (player.active) {
      appContext.togglePlayer();
    }
  }, [player.active]);

  return (
    <Container>
      {player?.active && (
        <>
          <TrackInfo>
            <Image
              src={currentTrack?.artwork[0].src}
              fallback={fallback}
              style={{ width: 70, height: 70 }}
            />
            <TrackTexts>
              <TrackName>{currentTrack?.title}</TrackName>
              <ArtistName>{currentTrack?.artist}</ArtistName>
            </TrackTexts>
          </TrackInfo>

          <TrackMiddle>
            <Playing>
              {player?.queue &&
                `${t('player.playing')}: ${player?.queue?.name}`}
            </Playing>
            <Controls>
              <Control onClick={() => dispatch(prev())}>
                <MdSkipPrevious size={40} color="#d99207" />
              </Control>
              <Control>
                {showPauseButton && (
                  <MdPause
                    size={40}
                    color="#d99207"
                    onClick={() => dispatch(pause())}
                  />
                )}

                {!showPauseButton && (
                  <MdPlayArrow
                    size={40}
                    color="#d99207"
                    onClick={() => dispatch(resume())}
                  />
                )}
              </Control>
              <Control onClick={() => dispatch(next())}>
                <MdSkipNext size={40} color="#d99207" />
              </Control>
            </Controls>
            <Progress>
              <ProgressTime>
                {formatTime(currentTrackProgress.position)}
              </ProgressTime>
              <ProgressBar
                value={
                  (currentTrackProgress.position * 100) /
                    currentTrackProgress.duration || 0
                }
                max="100"
              />
              <ProgressTime>
                {formatTime(currentTrackProgress.duration)}
              </ProgressTime>
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
        </>
      )}
    </Container>
  );
}

export default Player;

import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdPlayArrow,
  MdPause,
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeMute,
  MdQueueMusic,
  MdClose,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  usePlaybackTrackChanged,
  useTrackPlayerProgress,
  usePlaybackState,
  usePlayerQueue,
} from 'react-web-track-player';

import fallback from '../../assets/images/fallback.png';
import AppContext from '../../contexts/AppContext';
import usePersistedState from '../../hooks/usePersistedState';
import api from '../../services/api';
import { Creators as PlayerActions } from '../../store/ducks/player';
import Image from '../Image';
import SmallTrackItem from '../SmallTrackItem';
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
  PlayerQueueListContainer,
  PlayerQueueListHeader,
  PlayerQueueListTitle,
} from './styles';

function Player() {
  const { pause, resume, prev, next, skipToIndex } = PlayerActions;

  const appContext = useContext(AppContext);
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showPlayerQueueList, setShowPlayerQueueList] = useState(false);
  const [playCountStatus, setPlayCountStatus] = useState(null);
  const currentTrack = usePlaybackTrackChanged();
  const currentTrackProgress = useTrackPlayerProgress();
  const playbackState = usePlaybackState();
  const playerQueue = usePlayerQueue();
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

  function handleTogglePlayerQueueList() {
    setShowPlayerQueueList(!showPlayerQueueList);
  }

  function handleSkipToQueueTrack(trackId) {
    const trackIndex = playerQueue.findIndex((track) => track.id === trackId);
    dispatch(skipToIndex(trackIndex));
  }

  return (
    <>
      <Container>
        {player?.active && (
          <>
            <TrackInfo>
              <Image
                src={
                  currentTrack?.artwork[0].src ||
                  player?.queue?.preloadedTrack?.artwork
                }
                fallback={fallback}
                style={{ width: 70, height: 70 }}
              />
              <TrackTexts>
                <TrackName>
                  {currentTrack?.title || player?.queue?.preloadedTrack?.title}
                </TrackName>
                <ArtistName>
                  {currentTrack?.artist ||
                    player?.queue?.preloadedTrack?.artist}
                </ArtistName>
              </TrackTexts>
            </TrackInfo>

            <TrackMiddle>
              <Playing>
                {player?.queue &&
                  `${t('player.playing')}: ${player?.queue?.name}`}
              </Playing>
              <Controls>
                <Control
                  style={{ marginRight: 5 }}
                  onClick={() => dispatch(prev())}
                >
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
                <Control
                  style={{ marginLeft: 5 }}
                  onClick={() => dispatch(next())}
                >
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
              <MdVolumeMute size={20} color="#d99207" />
              <VolumeBar
                onChange={handleVolumeChange}
                value={volume}
                type="range"
                min="0"
                max="100"
              />
            </Volume>
            <Control
              style={{ marginLeft: 10 }}
              onClick={handleTogglePlayerQueueList}
            >
              <MdQueueMusic size={20} color="#d99207" />
            </Control>
          </>
        )}
      </Container>

      {showPlayerQueueList && (
        <PlayerQueueListContainer>
          <PlayerQueueListHeader>
            <PlayerQueueListTitle>
              {player?.queue &&
                `${t('player.queue_list_playing')} - ${player?.queue?.name}`}
            </PlayerQueueListTitle>
            <Control onClick={handleTogglePlayerQueueList}>
              <MdClose size={20} color="#d99207" />
            </Control>
          </PlayerQueueListHeader>
          {player?.queue && (
            <div>
              {playerQueue.length > 0 &&
                playerQueue.map((track) => (
                  <SmallTrackItem
                    key={track.id}
                    data={{
                      name: track.title,
                      picture: track.artwork[0].src,
                      artists: track.artist
                        ? track.artist.split(',').map((artist) => {
                            return { name: artist };
                          })
                        : '',
                    }}
                    onClick={() => handleSkipToQueueTrack(track.id)}
                  />
                ))}
            </div>
          )}
        </PlayerQueueListContainer>
      )}
    </>
  );
}

export default Player;

import React, { useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import fallback from '../../assets/images/fallback.png';
import GlobalHeader from '../../components/GlobalHeader';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import SmallTrackItem from '../../components/SmallTrackItem';
import api from '../../services/api';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Creators as PlaylistActions } from '../../store/ducks/playlist';
import {
  Content,
  Header,
  HeaderInfo,
  HeaderTitle,
  Meta,
  Buttons,
  Button,
  Section,
  SectionTitle,
  TracksList,
} from './styles';

function Playlist({
  match: {
    params: { playlistId },
  },
  history,
}) {
  const {
    fetchPlaylist,
    fetchTracks,
    removeTrackFromPlaylist,
    clearPlaylist,
  } = PlaylistActions;

  const params = useParams();
  const playlist = useSelector((state) => state.playlist);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (Number(params.playlistId) !== playlist.data.id) {
      dispatch(clearPlaylist());
      dispatch(fetchPlaylist(playlistId));
    }
  }, []);

  function handleEndReached() {
    if (playlist.tracks.total > playlist.tracks.data.length) {
      dispatch(fetchTracks(playlist.tracks.page, playlistId));
    }
  }

  const containerRef = useBottomScrollListener(handleEndReached, 0, 200);

  async function handleRemoveTrackFromPlaylist(trackId) {
    try {
      const response = await api.delete(`/app/playlists/${playlistId}/tracks`, {
        data: { tracks: [trackId] },
      });

      if (response.status === 204) {
        dispatch(removeTrackFromPlaylist(trackId));
      }
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  function handlePlaylistPlay() {
    dispatch(PlayerActions.fetchPlaylist(playlistId, 'playlists'));
  }

  return (
    <Content ref={containerRef}>
      <GlobalHeader history={history} />

      {playlist.loading && playlist.tracks.loading && (
        <LoadingSpinner size={120} loading={playlist.loading} />
      )}

      {!playlist.loading && (
        <>
          <Header>
            <Image
              src={playlist.data.picture}
              fallback={fallback}
              style={{ width: 100, height: 100 }}
            />

            <HeaderInfo>
              <HeaderTitle>{playlist.data.name}</HeaderTitle>
              <div>
                <Meta>{`${playlist.data.tracks} ${t('commons.tracks')}`}</Meta>
              </div>
              <Buttons>
                {playlist.tracks.data.length > 0 && (
                  <Button onClick={handlePlaylistPlay}>
                    {t('commons.play_tracks_button')}
                  </Button>
                )}
              </Buttons>
            </HeaderInfo>
          </Header>

          {playlist.tracks.data.length > 0 ? (
            <Section>
              <SectionTitle>{t('commons.tracks')}</SectionTitle>
              <TracksList>
                {playlist.tracks.data.map((data) => (
                  <SmallTrackItem
                    key={data.id}
                    data={data}
                    isPlaylist
                    onRemoveTrackFromPlaylist={() =>
                      handleRemoveTrackFromPlaylist(data.id)
                    }
                  />
                ))}
              </TracksList>
            </Section>
          ) : (
            <SectionTitle>{t('commons.no_track_available')}</SectionTitle>
          )}
        </>
      )}
    </Content>
  );
}

export default Playlist;

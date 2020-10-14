import React, { useEffect, useCallback, useState, useContext } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { MdClear } from 'react-icons/md';
import { useInfiniteQuery, useMutation, useQueryCache } from 'react-query';

import fallback from '../../assets/images/fallback.png';
import AppContext from '../../contexts/AppContext';
import api from '../../services/api';
import Image from '../Image';
import LoadingSpinner from '../LoadingSpinner';
import {
  Container,
  Modal,
  Header,
  HeaderTitle,
  HeaderButton,
  Body,
  PlaylistItem,
  PlaylistOpacity,
  PlaylistInfo,
  PlaylistTitle,
  PlaylistTracks,
  Warning,
} from './styles';

function PlaylistModal() {
  const appContext = useContext(AppContext);
  const { t } = useTranslation();
  const queryCache = useQueryCache();

  const [totalPlaylists, setTotalPlaylists] = useState(0);

  const playlistsQuery = useInfiniteQuery(
    'libraryPlaylists',
    async (key, page = 1) => {
      const response = await api.get(`/app/me/playlists?page=${page}`);

      return response.data;
    },
    {
      getFetchMore: (lastGroup) => {
        if (Math.ceil(lastGroup.meta.total / 10) > lastGroup.meta.page) {
          return lastGroup.meta.page + 1;
        }

        return false;
      },
    }
  );

  const [addTrackToPlaylist] = useMutation(
    async ({ playlistId, track }) => {
      await api.post(`/app/playlists/${playlistId}/tracks`, {
        tracks: [track.id],
      });

      return { playlistId };
    },
    {
      onSettled: ({ playlistId }) => {
        queryCache.invalidateQueries('libraryPlaylists');
        queryCache.invalidateQueries(`playlist-${playlistId}-tracks`);
      },
    }
  );

  function handleAddTrack({ playlistId }) {
    addTrackToPlaylist({
      playlistId,
      track: {
        id: appContext.playlistModal.track.id,
        picture: appContext.playlistModal.track.picture,
      },
    });
  }

  function handleCloseModal() {
    appContext.closePlaylistModal();
  }

  function handleCloseModalFromContainer(e) {
    if (e.target.id === 'container') handleCloseModal();
  }

  const onEndReached = useCallback(() => {
    playlistsQuery.fetchMore();
  }, []);

  useEffect(() => {
    if (!playlistsQuery.isLoading) {
      playlistsQuery.data.forEach((group) => {
        setTotalPlaylists(totalPlaylists + group.playlists.length);
      });
    }
  }, [playlistsQuery.isLoading, playlistsQuery.data]);

  const playlistListRef = useBottomScrollListener(onEndReached);

  return (
    <Container id="container" onClick={handleCloseModalFromContainer}>
      <Modal>
        <Header>
          <HeaderTitle>{t('playlist_modal.title')}</HeaderTitle>
          <HeaderButton onClick={handleCloseModal}>
            <MdClear size={18} color="#d99207" />
          </HeaderButton>
        </Header>
        <Body ref={playlistListRef}>
          {playlistsQuery.isSuccess && totalPlaylists === 0 && (
            <Warning>{t('commons.you_dont_have_any_playlist')}</Warning>
          )}

          {playlistsQuery.isLoading && <LoadingSpinner size={48} loading />}

          {playlistsQuery.isSuccess &&
            playlistsQuery.data.map((group, index) => (
              <React.Fragment key={index}>
                {group.playlists.map((playlist) => (
                  <PlaylistItem
                    key={playlist.id}
                    onClick={() => handleAddTrack({ playlistId: playlist.id })}
                  >
                    <PlaylistOpacity />
                    <Image
                      src={playlist.picture}
                      fallback={fallback}
                      style={{
                        borderWidth: 1,
                        borderColor: '#141414',
                        borderStyle: 'solid',
                        width: 90,
                        height: 90,
                      }}
                    />
                    <PlaylistInfo>
                      <PlaylistTitle>{playlist.name}</PlaylistTitle>
                      <PlaylistTracks>{`${playlist.tracks} ${t(
                        'commons.tracks'
                      )}`}</PlaylistTracks>
                    </PlaylistInfo>
                  </PlaylistItem>
                ))}
                ;
              </React.Fragment>
            ))}
        </Body>
      </Modal>
    </Container>
  );
}

export default PlaylistModal;

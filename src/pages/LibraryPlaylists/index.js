import React, { useCallback, useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from 'react-query';

import fallback from '../../assets/images/fallback.png';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import {
  PlaylistList,
  PlaylistItem,
  PlaylistInfo,
  PlaylistMeta,
  PlaylistName,
  PlaylistTracks,
  Warning,
} from './styles';

function LibraryPlaylists({ history }) {
  const { t } = useTranslation();
  const [totalPlaylists, setTotalPlaylists] = useState(0);

  const playlistsQuery = useInfiniteQuery(
    'libraryPlaylists',
    async (key, page = 1) => {
      const response = await api.get(`/app/me/library/playlists?page=${page}`);

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

  const onEndReached = useCallback(() => {
    playlistsQuery.fetchMore();
  }, []);

  useEffect(() => {
    if (playlistsQuery.isSuccess) {
      playlistsQuery.data.forEach((group) => {
        setTotalPlaylists(totalPlaylists + group.playlists.length);
      });
    }
  }, [playlistsQuery.isSuccess, playlistsQuery.data]);

  const playlistListRef = useBottomScrollListener(onEndReached);

  return (
    <PlaylistList ref={playlistListRef}>
      {playlistsQuery.isLoading && <LoadingSpinner loading size={40} />}

      {playlistsQuery.isError && (
        <Warning>{t('commons.internal_server_error')}</Warning>
      )}

      {playlistsQuery.isSuccess && totalPlaylists === 0 && (
        <Warning>{t('commons.you_dont_have_any_playlist')}</Warning>
      )}

      {playlistsQuery.isSuccess &&
        totalPlaylists > 0 &&
        playlistsQuery.data.map((group, index) => (
          <React.Fragment key={index}>
            {group.playlists.map((playlist) => (
              <PlaylistItem key={playlist.id}>
                <Image
                  src={playlist.picture}
                  fallback={fallback}
                  style={{ width: 90, height: 90, cursor: 'pointer' }}
                  onClick={() => history.push(`/playlists/${playlist.id}`)}
                />

                <PlaylistInfo>
                  <PlaylistMeta>
                    <PlaylistName
                      onClick={() => history.push(`/playlists/${playlist.id}`)}
                    >
                      {playlist.name}
                    </PlaylistName>
                    <PlaylistTracks>{`${playlist.tracks} ${t(
                      'commons.tracks'
                    )}`}</PlaylistTracks>
                  </PlaylistMeta>
                </PlaylistInfo>
              </PlaylistItem>
            ))}
          </React.Fragment>
        ))}
    </PlaylistList>
  );
}

export default LibraryPlaylists;

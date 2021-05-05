import React, { useCallback, useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery, useMutation, useQueryCache } from 'react-query';
import { useDispatch } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import GlobalHeader from '../../components/GlobalHeader';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import SmallTrackItem from '../../components/SmallTrackItem';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import { Creators as PlayerActions } from '../../store/ducks/player';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryCache = useQueryCache();

  const [totalTracks, setTotalTracks] = useState(0);

  const playlistQuery = useFetch(
    `playlist-${playlistId}`,
    `/app/playlists/${playlistId}`
  );

  const tracksQuery = useInfiniteQuery(
    `playlist-${playlistId}-tracks`,
    async (key, page = 1) => {
      const response = await api.get(
        `/app/playlists/${playlistId}/tracks?page=${page}`
      );

      return response.data;
    },
    {
      refetchInterval: 999999999,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      getFetchMore: (lastGroup) => {
        if (Math.ceil(lastGroup?.meta.total / 10) > lastGroup?.meta.page) {
          return lastGroup?.meta.page + 1;
        }

        return false;
      },
    }
  );

  const onEndReached = useCallback(() => {
    tracksQuery.fetchMore();
  }, []);

  const [removeTrackFromPlaylist] = useMutation(
    async ({ trackId }) => {
      const response = await api.delete(
        `/app/me/library/playlists/${playlistId}/tracks`,
        {
          data: { tracks: [trackId] },
        }
      );

      return response.data;
    },
    {
      onMutate: ({ trackId }) => {
        queryCache.cancelQueries(`playlist-${playlistId}-tracks`);

        const previousTodos = queryCache.getQueryData(
          `playlist-${playlistId}-tracks`
        );

        queryCache.setQueryData(`playlist-${playlistId}-tracks`, (old) => {
          return old.map((group) => {
            return {
              meta: {
                ...group.meta,
                total: group.total - 1,
              },
              tracks: group.tracks.filter((track) => track.id !== trackId),
            };
          });
        });

        return () =>
          queryCache.setQueryData(
            `playlist-${playlistId}-tracks`,
            previousTodos
          );
      },
      onError: (err, _, rollback) => rollback(),
      onSettled: () => {
        queryCache.invalidateQueries(`playlist-${playlistId}-tracks`);
      },
    }
  );

  useEffect(() => {
    if (tracksQuery.isSuccess) {
      tracksQuery.data.forEach((group) => {
        setTotalTracks(totalTracks + group?.tracks.length);
      });
    }
  }, [tracksQuery.isSuccess, tracksQuery.data]);

  const containerRef = useBottomScrollListener(onEndReached);

  function handleQueuePlay() {
    if (playlistQuery.isSuccess && tracksQuery.isSuccess && totalTracks > 0) {
      const firstTrack = tracksQuery.data.map((group) => group.tracks[0])[0];

      dispatch(
        PlayerActions.loadQueue({
          name: playlistQuery.data.playlist.name,
          id: playlistId,
          type: 'playlists',
          preloadedTrack: {
            title: firstTrack.name,
            artwork: firstTrack.picture,
            artist: firstTrack.artists.map(
              (artist, index) => (index ? ', ' : '') + artist.name
            )[0],
          },
          listType: 'playlist',
          listId: playlistId,
        })
      );
    }
  }

  function handleQueueTrackPlay(track) {
    dispatch(PlayerActions.play(track, playlistId));
  }

  return (
    <Content ref={containerRef}>
      <GlobalHeader history={history} />

      {!playlistQuery.data && <LoadingSpinner size={120} loading />}

      {playlistQuery.data && (
        <Header>
          <Image
            src={playlistQuery.data.playlist.picture}
            fallback={fallback}
            style={{ width: 100, height: 100 }}
          />
          <HeaderInfo>
            <HeaderTitle>{playlistQuery.data.playlist.name}</HeaderTitle>
            <div>
              <Meta>{`${playlistQuery.data.playlist.tracks} ${t(
                'commons.tracks'
              )}`}</Meta>
            </div>
            <Buttons>
              <Button
                onClick={handleQueuePlay}
                cursorPointer={tracksQuery.isSuccess && totalTracks > 0}
              >
                {t('commons.play_tracks_button')}
              </Button>
            </Buttons>
          </HeaderInfo>
        </Header>
      )}

      {tracksQuery.isError && (
        <SectionTitle>{t('commons.internal_server_error')}</SectionTitle>
      )}

      {tracksQuery.isSuccess && totalTracks === 0 && (
        <SectionTitle>{t('commons.no_track_available')}</SectionTitle>
      )}

      {tracksQuery.isLoading && <LoadingSpinner size={40} loading />}

      {tracksQuery.isSuccess && totalTracks > 0 && (
        <Section>
          <SectionTitle>{t('commons.tracks')}</SectionTitle>
          <TracksList>
            {tracksQuery.data.map((group, index) => (
              <React.Fragment key={index}>
                {group?.tracks &&
                  group.tracks.map((track) => (
                    <SmallTrackItem
                      key={track.id}
                      data={track}
                      isPlaylist
                      showMenu
                      onClick={() => handleQueueTrackPlay(track)}
                      onRemoveTrackFromPlaylist={() =>
                        removeTrackFromPlaylist({ trackId: track.id })
                      }
                    />
                  ))}
              </React.Fragment>
            ))}
          </TracksList>
        </Section>
      )}
    </Content>
  );
}

export default Playlist;

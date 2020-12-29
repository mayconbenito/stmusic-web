import React, { useCallback, useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from 'react-query';
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
  HeaderType,
  HeaderTitle,
  Buttons,
  Button,
  Section,
  SectionTitle,
  TracksList,
} from './styles';

function Album({
  match: {
    params: { albumId },
  },
  history,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [totalTracks, setTotalTracks] = useState(0);

  const albumQuery = useFetch(`album-${albumId}`, `/app/albums/${albumId}`);

  const tracksQuery = useInfiniteQuery(
    `album-${albumId}-tracks`,
    async (key, page = 1) => {
      const response = await api.get(
        `/app/albums/${albumId}/tracks?page=${page}`
      );

      return response.data;
    },
    {
      refetchInterval: 999999999,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      getFetchMore: (lastGroup) => {
        if (Math.ceil(lastGroup.meta.total / 10) > lastGroup.meta.page) {
          return lastGroup.meta.page + 1;
        }

        return false;
      },
    }
  );

  const onEndReached = useCallback(() => {
    tracksQuery.fetchMore();
  }, []);

  useEffect(() => {
    if (tracksQuery.isSuccess) {
      tracksQuery.data.forEach((group) => {
        setTotalTracks(totalTracks + group.tracks.length);
      });
    }
  }, [tracksQuery.isSuccess, tracksQuery.data]);

  const containerRef = useBottomScrollListener(onEndReached);

  function handleQueuePlay() {
    if (albumQuery.isSuccess && tracksQuery.isSuccess && totalTracks > 0) {
      const firstTrack = tracksQuery.data.map((group) => group.tracks[0])[0];

      dispatch(
        PlayerActions.loadQueue({
          name: albumQuery.data.album.name,
          id: albumId,
          type: 'albums',
          preloadedTrack: {
            title: firstTrack.name,
            artwork: firstTrack.picture,
            artist: firstTrack.artists.map(
              (artist, index) => (index ? ', ' : '') + artist.name
            )[0],
          },
        })
      );
    }
  }

  function handleQueueTrackPlay(track) {
    dispatch(PlayerActions.play(track, albumId));
  }

  return (
    <Content ref={containerRef}>
      <GlobalHeader history={history} />

      {albumQuery.isLoading && <LoadingSpinner size={120} loading />}

      {albumQuery.isSuccess && (
        <Header>
          <Image
            src={albumQuery.data.album.picture}
            fallback={fallback}
            style={{ width: 100, height: 100 }}
          />
          <HeaderInfo>
            <HeaderType>{t('commons.album')}</HeaderType>
            <HeaderTitle>{albumQuery.data.album.name}</HeaderTitle>
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
                {group.tracks.map((album) => (
                  <SmallTrackItem
                    key={album.id}
                    data={album}
                    showMenu
                    onClick={() => handleQueueTrackPlay(album)}
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

export default Album;

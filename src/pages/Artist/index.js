import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdPlayArrow } from 'react-icons/md';
import { useMutation, useQueryCache } from 'react-query';
import { useDispatch } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import AlbumItem from '../../components/AlbumItem';
import Carousel from '../../components/Carousel';
import GlobalHeader from '../../components/GlobalHeader';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import SmallTrackItem from '../../components/SmallTrackItem';
import { isLoggedIn } from '../../helpers/session';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import { Creators as PlayerActions } from '../../store/ducks/player';
import theme from '../../styles/theme';
import {
  Content,
  Header,
  HeaderInfo,
  HeaderTitle,
  Meta,
  Buttons,
  Button,
  Section,
  SectionTitleContainer,
  SectionTitle,
  SectionPlayButton,
  TracksList,
} from './styles';

function Artist({
  match: {
    params: { artistId },
  },
  history,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryCache = useQueryCache();

  const artistFollowingStateQuery = useFetch(
    `artist-${artistId}-followingState`,
    `/app/me/following/artists/contains?artists=${artistId}`
  );
  const artistQuery = useFetch(
    `artist-${artistId}`,
    `/app/artists/${artistId}`
  );
  const albumsQuery = useFetch(
    `artist-${artistId}-albums`,
    `/app/artists/${artistId}/albums?page=1&limit=100`
  );
  const mostPlayedTracksQuery = useFetch(
    `artist-${artistId}-mostPlayedTracks`,
    `/app/artists/${artistId}/most-played-tracks?page=1&limit=10`
  );
  const tracksQuery = useFetch(
    `artist-${artistId}-tracks`,
    `/app/artists/${artistId}/tracks?page=1&limit=10`
  );

  const [followArtist] = useMutation(
    async () => {
      const response = await api.put('/app/me/following/artists', {
        artists: [parseInt(artistId)],
      });

      return response.data;
    },
    {
      onMutate: () => {
        queryCache.cancelQueries(`artist-${artistId}-followingState`);

        const previousFollowingState = queryCache.getQueryData(
          `artist-${artistId}-followingState`
        );

        queryCache.setQueryData(`artist-${artistId}-followingState`, () => {
          return {
            artists: [parseInt(artistId)],
          };
        });

        queryCache.invalidateQueries('libraryArtists');

        return () =>
          queryCache.setQueryData(
            `artist-${artistId}-followingState`,
            previousFollowingState
          );
      },
      onError: (err, _, rollback) => rollback(),
      onSettled: () => {
        queryCache.invalidateQueries(`artist-${artistId}-followingState`);
      },
    }
  );

  const [unfollowArtist] = useMutation(
    async () => {
      const response = await api.delete('/app/me/following/artists', {
        data: { artists: [artistId] },
      });

      return response.data;
    },
    {
      onMutate: () => {
        queryCache.cancelQueries(`artist-${artistId}-followingState`);

        const previousFollowingState = queryCache.getQueryData(
          `artist-${artistId}-followingState`
        );

        queryCache.setQueryData(`artist-${artistId}-followingState`, (old) => {
          return {
            artists: old.artists.filter((artist) => {
              return artist !== parseInt(artistId);
            }),
          };
        });

        queryCache.invalidateQueries('libraryArtists');

        return () =>
          queryCache.setQueryData(
            `artist-${artistId}-followingState`,
            previousFollowingState
          );
      },
      onError: (err, _, rollback) => rollback(),
      onSettled: () => {
        queryCache.invalidateQueries(`artist-${artistId}-followingState`);
      },
    }
  );

  function handleFollowing() {
    if (
      artistFollowingStateQuery.isSuccess &&
      !artistFollowingStateQuery.data.artists.find(
        (itemId) => itemId === parseInt(artistId)
      )
    ) {
      followArtist();
    } else {
      unfollowArtist();
    }
  }

  function handleQueuePlay({ name, tracks, nameKey }) {
    dispatch(
      PlayerActions.loadQueue(null, {
        id: `${nameKey}-${artistId}`,
        name,
        tracks,
      })
    );
  }

  function handleQueueTrackPlay(track, nameKey) {
    dispatch(PlayerActions.play(track, `${nameKey}-${artistId}`));
  }

  function isLoading() {
    if (!albumsQuery.isLoading) {
      return false;
    }

    if (!mostPlayedTracksQuery.isLoading) {
      return false;
    }

    if (!tracksQuery.isLoading) {
      return false;
    }

    return true;
  }

  return (
    <Content>
      <GlobalHeader history={history} />

      {artistQuery.isLoading && <LoadingSpinner size={120} loading />}

      {artistQuery.isSuccess && (
        <Header>
          <Image
            src={artistQuery.data.artist.picture}
            fallback={fallback}
            style={{ width: 100, height: 100, borderRadius: '100%' }}
          />

          <HeaderInfo>
            <HeaderTitle>{artistQuery.data.artist.name}</HeaderTitle>

            <div>
              <Meta>{`${artistQuery.data.artist.followers} ${t(
                'commons.followers'
              )}`}</Meta>
            </div>
            <Buttons>
              {isLoggedIn() && (
                <Button onClick={handleFollowing}>
                  {artistFollowingStateQuery.isSuccess &&
                  artistFollowingStateQuery.data.artists.find(
                    (itemId) => itemId === parseInt(artistId)
                  )
                    ? t('commons.following')
                    : t('commons.follow')}
                </Button>
              )}
            </Buttons>
          </HeaderInfo>
        </Header>
      )}

      {isLoading() && <LoadingSpinner size={40} loading />}

      {albumsQuery.data?.albums?.length > 0 && (
        <Section>
          <Carousel
            carouselName={t('commons.albums')}
            totalItems={albumsQuery.data?.albums?.length}
          >
            {albumsQuery.data.albums.map((data) => (
              <AlbumItem
                key={data.id}
                data={data}
                style={{ marginBottom: 5 }}
                onClick={() => history.push(`/albums/${data.id}`)}
              />
            ))}
          </Carousel>
        </Section>
      )}

      {mostPlayedTracksQuery.data?.tracks?.length > 0 && (
        <Section>
          <SectionTitleContainer>
            <SectionTitle>{t('artist.most_played_tracks')}</SectionTitle>
            <SectionPlayButton
              onClick={() =>
                handleQueuePlay({
                  name: `${t('commons.most_played_from')} ${
                    artistQuery.data.artist.name
                  }`,
                  tracks: mostPlayedTracksQuery.data?.tracks,
                  nameKey: 'most_played_from',
                })
              }
            >
              <MdPlayArrow size={24} color={theme.colors.primary} />
            </SectionPlayButton>
          </SectionTitleContainer>
          <TracksList>
            {mostPlayedTracksQuery.data?.tracks.map((data) => (
              <SmallTrackItem
                key={data.id}
                data={data}
                showMenu
                onClick={() => handleQueueTrackPlay(data, 'most_played_from')}
              />
            ))}
          </TracksList>
        </Section>
      )}

      {tracksQuery.data?.tracks?.length > 0 && (
        <Section>
          <SectionTitleContainer>
            <SectionTitle>{t('artist.artist_tracks')}</SectionTitle>
            <SectionPlayButton
              onClick={() =>
                handleQueuePlay({
                  name: artistQuery.data.artist.name,
                  tracks: tracksQuery.data?.tracks,
                  nameKey: 'artist_tracks',
                })
              }
            >
              <MdPlayArrow size={24} color={theme.colors.primary} />
            </SectionPlayButton>
          </SectionTitleContainer>
          <TracksList>
            {tracksQuery.data?.tracks.map((data) => (
              <SmallTrackItem
                key={data.id}
                data={data}
                showMenu
                onClick={() => handleQueueTrackPlay(data, 'artist_tracks')}
              />
            ))}
          </TracksList>
        </Section>
      )}
    </Content>
  );
}

export default Artist;

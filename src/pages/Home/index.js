import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import AlbumItem from '../../components/AlbumItem';
import ArtistItem from '../../components/ArtistItem';
import BigPlaylistItem from '../../components/BigPlaylistItem';
import Carousel from '../../components/Carousel';
import GenreItem from '../../components/GenreItem';
import GlobalHeader from '../../components/GlobalHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import { isLoggedIn } from '../../helpers/session';
import useFetch from '../../hooks/useFetch';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Content, ContentTitle, Section } from './styles';

function Home({ history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  let recentlyPlayedQuery;

  if (isLoggedIn()) {
    recentlyPlayedQuery = useFetch(
      isLoggedIn() ? 'recentlyPlayed' : null,
      '/app/me/recently-played?page=1&limit=30'
    );
  }

  const genresQuery = useFetch('genres', '/app/genres?page=1&limit=30');
  const trendingQuery = useFetch(
    'trending',
    '/app/browse/tracks/trending?page=1&limit=30'
  );
  const mostPlayedTracksQuery = useFetch(
    'mostPlayedTracks',
    '/app/browse/tracks/most-played?page=1&limit=30'
  );
  const mostFollowedArtistsQuery = useFetch(
    'mostFollowedArtists',
    '/app/browse/artists/most-followed?page=1&limit=30'
  );

  function handleQueuePlay({ name, tracks, nameKey }) {
    dispatch(
      PlayerActions.loadQueue(null, {
        id: nameKey,
        name,
        tracks,
      })
    );
  }

  function handleQueueTrackPlay(track, nameKey) {
    dispatch(PlayerActions.play(track, nameKey));
  }

  function isLoading() {
    if (!recentlyPlayedQuery?.isLoading) {
      return false;
    }

    if (!genresQuery.isLoading) {
      return false;
    }

    if (!trendingQuery.isLoading) {
      return false;
    }

    if (!mostPlayedTracksQuery.isLoading) {
      return false;
    }

    if (!mostFollowedArtistsQuery.isLoading) {
      return false;
    }

    return true;
  }

  return (
    <Content>
      <GlobalHeader history={history} />

      {!isLoading() ? (
        <>
          <ContentTitle>{t('home.title')}</ContentTitle>

          {recentlyPlayedQuery?.data?.lists?.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.recently_played')}
                totalItems={recentlyPlayedQuery?.data?.lists.length}
                onPlay={() =>
                  handleQueuePlay({
                    name: t('home.recently_played'),
                    tracks: recentlyPlayedQuery?.data?.lists,
                    nameKey: 'recently_played',
                  })
                }
              >
                {recentlyPlayedQuery?.data?.lists.map((data) => {
                  if (data.listType === 'artist') {
                    return (
                      <ArtistItem
                        key={data.id}
                        data={{ name: data.name, picture: data.picture }}
                        onClick={() => history.push(`/artists/${data.id}`)}
                      />
                    );
                  }

                  if (data.listType === 'album') {
                    return (
                      <AlbumItem
                        key={data.id}
                        data={{
                          name: data.name,
                          picture: data.picture,
                          artists: data.artists,
                          type: data.albumType,
                        }}
                        onClick={() => history.push(`/albums/${data.id}`)}
                      />
                    );
                  }

                  if (data.listType === 'playlist') {
                    return (
                      <BigPlaylistItem
                        key={data.id}
                        data={{
                          name: data.name,
                          picture: data.picture,
                        }}
                        onClick={() => history.push(`/playlists/${data.id}`)}
                      />
                    );
                  }

                  if (data.listType === 'genre') {
                    return (
                      <GenreItem
                        key={data.id}
                        data={{
                          name: data.name,
                        }}
                        onClick={() => history.push(`/genres/${data.id}`)}
                      />
                    );
                  }
                })}
              </Carousel>
            </Section>
          )}

          {genresQuery.data?.genres?.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.genres')}
                totalItems={genresQuery.data?.genres?.length}
              >
                {genresQuery.data?.genres.map((data) => (
                  <GenreItem
                    key={data.id}
                    data={data}
                    onClick={() => history.push(`/genres/${data.id}`)}
                  />
                ))}
              </Carousel>
            </Section>
          )}

          {trendingQuery?.data?.tracks?.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.trending')}
                totalItems={trendingQuery?.data?.tracks?.length}
                onPlay={() =>
                  handleQueuePlay({
                    name: t('home.trending'),
                    tracks: trendingQuery?.data?.tracks,
                    nameKey: 'trending',
                  })
                }
              >
                {trendingQuery?.data?.tracks.map((data) => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    onClick={() => handleQueueTrackPlay(data, 'trending')}
                  />
                ))}
              </Carousel>
            </Section>
          )}

          {mostPlayedTracksQuery?.data?.tracks?.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.most_played_tracks')}
                totalItems={mostPlayedTracksQuery?.data?.tracks?.length}
                onPlay={() =>
                  handleQueuePlay({
                    name: t('home.most_played_tracks'),
                    tracks: mostPlayedTracksQuery?.data?.tracks,
                    nameKey: 'most_played_tracks',
                  })
                }
              >
                {mostPlayedTracksQuery?.data?.tracks.map((data) => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    onClick={() =>
                      handleQueueTrackPlay(data, 'most_played_tracks')
                    }
                  />
                ))}
              </Carousel>
            </Section>
          )}

          {mostFollowedArtistsQuery?.data?.artists?.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.most_followed_artists')}
                totalItems={mostFollowedArtistsQuery?.data?.artists}
              >
                {mostFollowedArtistsQuery?.data?.artists.map((data) => (
                  <ArtistItem
                    key={data.id}
                    data={data}
                    onClick={() => history.push(`/artists/${data.id}`)}
                  />
                ))}
              </Carousel>
            </Section>
          )}
        </>
      ) : (
        <LoadingSpinner size={120} loading />
      )}
    </Content>
  );
}

export default Home;

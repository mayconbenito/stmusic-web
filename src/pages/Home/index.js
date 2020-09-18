import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ArtistItem from '../../components/ArtistItem';
import Carousel from '../../components/Carousel';
import GenreItem from '../../components/GenreItem';
import GlobalHeader from '../../components/GlobalHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import { Creators as BrowseActions } from '../../store/ducks/browse';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Content, ContentTitle, Section } from './styles';

function Home({ history }) {
  const browse = useSelector((state) => state.browse);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!browse.isFetched) {
      dispatch(BrowseActions.fetchBrowse());
    }
  }, []);

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

  return (
    <Content>
      <GlobalHeader history={history} />

      {!browse.loading ? (
        <>
          <ContentTitle>{t('home.title')}</ContentTitle>

          {browse.recentlyPlayed.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.recently_played')}
                totalItems={browse.recentlyPlayed.length}
                onPlay={() =>
                  handleQueuePlay({
                    name: t('home.recently_played'),
                    tracks: browse.recentlyPlayed,
                    nameKey: 'recently_played',
                  })
                }
              >
                {browse.recentlyPlayed.map((data) => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    onClick={() =>
                      handleQueueTrackPlay(data, 'recently_played')
                    }
                  />
                ))}
              </Carousel>
            </Section>
          )}

          {browse.genres.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.genres')}
                totalItems={browse.genres.length}
              >
                {browse.genres.map((data) => (
                  <GenreItem
                    key={data.id}
                    data={data}
                    onClick={() => history.push(`/genres/${data.id}`)}
                  />
                ))}
              </Carousel>
            </Section>
          )}

          {browse.trending.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.trending')}
                totalItems={browse.trending.length}
                onPlay={() =>
                  handleQueuePlay({
                    name: t('home.trending'),
                    tracks: browse.trending,
                    nameKey: 'trending',
                  })
                }
              >
                {browse.trending.map((data) => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    onClick={() => handleQueueTrackPlay(data, 'trending')}
                  />
                ))}
              </Carousel>
            </Section>
          )}

          {browse.mostPlayed.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.most_played_tracks')}
                totalItems={browse.mostPlayed.length}
                onPlay={() =>
                  handleQueuePlay({
                    name: t('home.most_played_tracks'),
                    tracks: browse.mostPlayed,
                    nameKey: 'most_played_tracks',
                  })
                }
              >
                {browse.mostPlayed.map((data) => (
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

          {browse.mostFollowed.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('home.most_followed_artists')}
                totalItems={browse.mostFollowed.length}
              >
                {browse.mostFollowed.map((data) => (
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
        <LoadingSpinner size={120} loading={browse.loading} />
      )}
    </Content>
  );
}

export default Home;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArtistItem from '../../components/ArtistItem';
import Carrousel from '../../components/Carrousel';
import TrackItem from '../../components/TrackItem';
import { Creators as BrowseActions } from '../../store/ducks/browse';
import {
  Content,
  ContentTitle,
  Section,
  GenreItem,
  GenreImage,
  GenreTitle,
} from './styles';

function Home({ history }) {
  const {
    fetchGenres,
    fetchRecentlyPlayed,
    fetchTrending,
    fetchMostPlayed,
    fetchMostFollowed,
  } = BrowseActions;
  const browse = useSelector(state => state.browse);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchRecentlyPlayed());
    dispatch(fetchTrending());
    dispatch(fetchMostPlayed());
    dispatch(fetchMostFollowed());
  }, []);

  return (
    <Content>
      <ContentTitle>Ínicio</ContentTitle>

      {browse.recentlyPlayed.length > 0 && (
        <Section>
          <Carrousel
            carrouselName="Tocadas recentemente"
            totalItems={browse.recentlyPlayed.length}
          >
            {browse.recentlyPlayed.map(data => (
              <TrackItem key={data.id} data={data} />
            ))}
          </Carrousel>
        </Section>
      )}

      {browse.genres.length > 0 && (
        <Section>
          <Carrousel carrouselName="Gêneros" totalItems={browse.genres.length}>
            {browse.genres.map(data => (
              <GenreItem key={data.id}>
                <GenreImage
                  src={data.picture}
                  style={{ width: 260, height: 129 }}
                />
                <GenreTitle onClick={() => history.push(`/genres/${data.id}`)}>
                  {data.name}
                </GenreTitle>
              </GenreItem>
            ))}
          </Carrousel>
        </Section>
      )}

      {browse.trending.length > 0 && (
        <Section>
          <Carrousel
            carrouselName="Em alta"
            totalItems={browse.trending.length}
          >
            {browse.trending.map(data => (
              <TrackItem key={data.id} data={data} />
            ))}
          </Carrousel>
        </Section>
      )}

      {browse.mostPlayed.length > 0 && (
        <Section>
          <Carrousel
            carrouselName="Mais tocadas"
            totalItems={browse.mostPlayed.length}
          >
            {browse.mostPlayed.map(data => (
              <TrackItem key={data.id} data={data} />
            ))}
          </Carrousel>
        </Section>
      )}

      {browse.mostFollowed.length > 0 && (
        <Section>
          <Carrousel
            carrouselName="Artistas mais seguidos"
            totalItems={browse.mostFollowed.length}
          >
            {browse.mostFollowed.map(data => (
              <ArtistItem
                key={data.id}
                data={data}
                onClick={() => history.push(`/artists/${data.id}`)}
              />
            ))}
          </Carrousel>
        </Section>
      )}
    </Content>
  );
}

export default Home;

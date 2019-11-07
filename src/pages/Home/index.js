import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArtistItem from '../../components/ArtistItem';
import TrackItem from '../../components/TrackItem';
import { Creators as BrowseActions } from '../../store/ducks/browse';
import {
  Content,
  ContentTitle,
  Section,
  SectionTitle,
  SectionItems,
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
          <SectionTitle>Tocadas recentemente</SectionTitle>
          <SectionItems>
            {browse.recentlyPlayed.map(data => (
              <TrackItem key={data.id} data={data} />
            ))}
          </SectionItems>
        </Section>
      )}

      {browse.genres.length > 0 && (
        <Section>
          <SectionTitle>Gêneros</SectionTitle>
          <SectionItems>
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
          </SectionItems>
        </Section>
      )}

      {browse.trending.length > 0 && (
        <Section>
          <SectionTitle>Em alta</SectionTitle>
          <SectionItems>
            {browse.trending.map(data => (
              <TrackItem key={data.id} data={data} />
            ))}
          </SectionItems>
        </Section>
      )}

      {browse.mostPlayed.length > 0 && (
        <Section>
          <SectionTitle>Mais tocadas</SectionTitle>
          <SectionItems>
            {browse.mostPlayed.map(data => (
              <TrackItem key={data.id} data={data} />
            ))}
          </SectionItems>
        </Section>
      )}

      {browse.mostFollowed.length > 0 && (
        <Section>
          <SectionTitle>Artistas mais seguidos</SectionTitle>
          <SectionItems>
            {browse.mostFollowed.map(data => (
              <ArtistItem
                key={data.id}
                data={data}
                onClick={() => history.push(`/artists/${data.id}`)}
              />
            ))}
          </SectionItems>
        </Section>
      )}
    </Content>
  );
}

export default Home;

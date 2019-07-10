import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import {
  Content,
  Header,
  HeaderContainer,
  HeaderInfo,
  HeaderTitle,
  Buttons,
  Button,
  Section,
  SectionTitle,
  TracksList,
} from './styles';

import { play } from '../../store/ducks/player';

import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import Image from '../../components/Image';

import { Creators as GenreActions } from '../../store/ducks/genre';

function Genre({
  match: {
    params: { genreId },
  },
}) {
  const { fetchGenre, fetchTracks, clearGenre } = GenreActions;
  const genre = useSelector(state => state.genre);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenre(genreId));
    dispatch(fetchTracks(1, genreId));

    return () => {
      dispatch(clearGenre());
    };
  }, []);

  const onEndReached = useCallback(
    () => {
      if (genre.tracks.total > genre.tracks.data.length) {
        dispatch(fetchTracks(genre.tracks.page, genreId));
      }
    },
    [genre.tracks.page, genre.tracks.total],
  );

  const artistListRef = useBottomScrollListener(onEndReached);

  return (
    <Content ref={artistListRef}>
      {genre.loading && <LoadingSpinner size={120} loading={genre.loading} />}

      {!genre.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={genre.data.picture}
                style={{ width: 100, height: 100, borderRadius: '100%' }}
              />
              <HeaderInfo>
                <HeaderTitle>{genre.data.name}</HeaderTitle>
              </HeaderInfo>
            </HeaderContainer>
            <Buttons>
              <Button>Tocar Músicas</Button>
            </Buttons>
          </Header>

          <Section>
            <SectionTitle>
              {genre.tracks.data.length > 0 ? 'Músicas' : 'Nenhuma música disponível'}
            </SectionTitle>
            <TracksList>
              {genre.tracks.data.map(data => (
                <TrackItem
                  key={data.id}
                  data={data}
                  onClick={() => dispatch(play(data))}
                  style={{ marginBottom: 5 }}
                />
              ))}
            </TracksList>
          </Section>
        </React.Fragment>
      )}
    </Content>
  );
}

export default Genre;

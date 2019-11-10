import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import fallback from '../../assets/images/fallback.png';
import { Creators as GenreActions } from '../../store/ducks/genre';
import { Creators as PlayerActions } from '../../store/ducks/player';
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

  function handlePlaylistPlay() {
    dispatch(PlayerActions.fetchPlaylist(genreId, 'genres'));
  }

  return (
    <Content>
      {genre.loading && <LoadingSpinner size={120} loading={genre.loading} />}

      {!genre.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={genre.data.picture}
                fallback={fallback}
                style={{ width: 100, height: 100, borderRadius: '100%' }}
              />
              <HeaderInfo>
                <HeaderTitle>{genre.data.name}</HeaderTitle>
              </HeaderInfo>
            </HeaderContainer>
            <Buttons>
              {genre.tracks.data.length > 0 && (
                <Button onClick={handlePlaylistPlay}>Tocar Músicas</Button>
              )}
            </Buttons>
          </Header>

          {genre.tracks.data.length > 0 ? (
            <Section>
              <SectionTitle>Músicas</SectionTitle>
              <TracksList>
                {genre.tracks.data.map(data => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    style={{ marginBottom: 5 }}
                  />
                ))}
              </TracksList>
            </Section>
          ) : (
            <SectionTitle>Nenhuma música disponível</SectionTitle>
          )}
        </React.Fragment>
      )}
    </Content>
  );
}

export default Genre;

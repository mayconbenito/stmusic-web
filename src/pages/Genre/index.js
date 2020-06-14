import React, { useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import SmallTrackItem from '../../components/SmallTrackItem';
import { Creators as GenreActions } from '../../store/ducks/genre';
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

function Genre({
  match: {
    params: { genreId },
  },
}) {
  const { fetchGenre, fetchTracks, clearGenre } = GenreActions;
  const genre = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleEndReached() {
    if (genre.tracks.total > genre.tracks.data.length) {
      dispatch(fetchTracks(genre.tracks.page, genreId));
    }
  }

  const containerRef = useBottomScrollListener(handleEndReached);

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
    <Content ref={containerRef}>
      {genre.loading && genre.tracks.loading && (
        <LoadingSpinner size={120} loading={genre.loading} />
      )}

      <React.Fragment>
        <Header>
          <Image
            src={genre.data.picture}
            fallback={fallback}
            style={{ width: 100, height: 100 }}
          />
          <HeaderInfo>
            <HeaderType>{t('commons.genre')}</HeaderType>
            <HeaderTitle>{genre.data.name}</HeaderTitle>
            <Buttons>
              {genre.tracks.data.length > 0 && (
                <Button onClick={handlePlaylistPlay}>
                  {t('commons.play_tracks_button')}
                </Button>
              )}
            </Buttons>
          </HeaderInfo>
        </Header>

        {genre.tracks.data.length > 0 ? (
          <Section>
            <SectionTitle>{t('commons.tracks')}</SectionTitle>
            <TracksList>
              {genre.tracks.data.map((data) => (
                <SmallTrackItem
                  key={data.id}
                  data={data}
                  style={{ marginBottom: 5 }}
                />
              ))}
            </TracksList>
          </Section>
        ) : (
          <SectionTitle>{t('commons.no_track_available')}</SectionTitle>
        )}
      </React.Fragment>
    </Content>
  );
}

export default Genre;

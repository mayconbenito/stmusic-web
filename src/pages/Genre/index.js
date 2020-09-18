import React, { useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import fallback from '../../assets/images/fallback.png';
import GlobalHeader from '../../components/GlobalHeader';
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
  history,
}) {
  const { fetchGenre, fetchTracks, clearGenre } = GenreActions;
  const params = useParams();
  const genre = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (Number(params.genreId) !== genre.data.id) {
      dispatch(clearGenre());
      dispatch(fetchGenre(genreId));
    }
  }, []);

  function handleEndReached() {
    if (genre.tracks.total > genre.tracks.data.length) {
      dispatch(fetchTracks(genre.tracks.page, genreId));
    }
  }

  const containerRef = useBottomScrollListener(handleEndReached);

  function handleQueuePlay() {
    dispatch(
      PlayerActions.loadQueue({
        name: genre.data.name,
        id: genreId,
        type: 'genres',
      })
    );
  }

  function handleQueueTrackPlay(track) {
    dispatch(PlayerActions.play(track, genreId));
  }

  return (
    <Content ref={containerRef}>
      <GlobalHeader history={history} />

      {genre.loading && <LoadingSpinner size={120} loading={genre.loading} />}

      {!genre.loading && (
        <>
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
                  <Button onClick={handleQueuePlay}>
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
                    onPress={() => handleQueueTrackPlay(data)}
                  />
                ))}
              </TracksList>
            </Section>
          ) : (
            <SectionTitle>{t('commons.no_track_available')}</SectionTitle>
          )}
        </>
      )}
    </Content>
  );
}

export default Genre;

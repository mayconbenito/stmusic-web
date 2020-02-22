import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import { Creators as AlbumActions } from '../../store/ducks/album';
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

function Album({
  match: {
    params: { albumId },
  },
}) {
  const { fetchAlbum, fetchTracks, clearAlbum } = AlbumActions;
  const album = useSelector(state => state.album);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAlbum(albumId));
    dispatch(fetchTracks(1, albumId));

    return () => {
      dispatch(clearAlbum());
    };
  }, []);

  function handlePlaylistPlay() {
    dispatch(PlayerActions.fetchPlaylist(albumId, 'albums'));
  }

  return (
    <Content>
      {album.loading && album.tracks.loading && (
        <LoadingSpinner size={120} loading={album.loading} />
      )}

      {!album.loading && !album.tracks.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={album.data.picture}
                fallback={fallback}
                style={{ width: 100, height: 100, borderRadius: '100%' }}
              />
              <HeaderInfo>
                <HeaderTitle>{album.data.name}</HeaderTitle>
              </HeaderInfo>
            </HeaderContainer>
            <Buttons>
              {album.tracks.data.length > 0 && (
                <Button onClick={handlePlaylistPlay}>
                  {t('commons.play_tracks_button')}
                </Button>
              )}
            </Buttons>
          </Header>

          {album.tracks.data.length > 0 ? (
            <Section>
              <SectionTitle>{t('commons.tracks')}</SectionTitle>
              <TracksList>
                {album.tracks.data.map(data => (
                  <TrackItem
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
      )}
    </Content>
  );
}

export default Album;

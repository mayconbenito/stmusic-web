import React, { useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import fallback from '../../assets/images/fallback.png';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import SmallTrackItem from '../../components/SmallTrackItem';
import { Creators as AlbumActions } from '../../store/ducks/album';
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

function Album({
  match: {
    params: { albumId },
  },
}) {
  const { fetchAlbum, fetchTracks, clearAlbum } = AlbumActions;
  const params = useParams();
  const album = useSelector((state) => state.album);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (Number(params.albumId) !== album.data.id) {
      dispatch(clearAlbum());
      dispatch(fetchAlbum(albumId));
    }
  }, []);

  function handleEndReached() {
    if (album.tracks.total > album.tracks.data.length) {
      dispatch(fetchTracks(album.tracks.page, albumId));
    }
  }

  const containerRef = useBottomScrollListener(handleEndReached);

  function handlePlaylistPlay() {
    dispatch(PlayerActions.fetchPlaylist(albumId, 'albums'));
  }

  return (
    <Content ref={containerRef}>
      {album.loading && <LoadingSpinner size={120} loading={album.loading} />}

      {!album.loading && (
        <>
          <Header>
            <Image
              src={album.data.picture}
              fallback={fallback}
              style={{ width: 100, height: 100 }}
            />
            <HeaderInfo>
              <HeaderType>{t('commons.album')}</HeaderType>
              <HeaderTitle>{album.data.name}</HeaderTitle>
              <Buttons>
                {album.tracks.data.length > 0 && (
                  <Button onClick={handlePlaylistPlay}>
                    {t('commons.play_tracks_button')}
                  </Button>
                )}
              </Buttons>
            </HeaderInfo>
          </Header>

          {album.tracks.data.length > 0 ? (
            <Section>
              <SectionTitle>{t('commons.tracks')}</SectionTitle>
              <TracksList>
                {album.tracks.data.map((data) => (
                  <SmallTrackItem key={data.id} data={data} />
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

export default Album;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import Image from '../../components/Image';

import { Creators as AlbumActions } from '../../store/ducks/album';
import { Creators as PlayerActions } from '../../store/ducks/player';

function Album({
  match: {
    params: { albumId },
  },
}) {
  const { fetchAlbum, fetchTracks, clearAlbum } = AlbumActions;
  const album = useSelector(state => state.album);
  const dispatch = useDispatch();

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

  console.log(album.data);

  return (
    <Content>
      {album.loading && <LoadingSpinner size={120} loading={album.loading} />}

      {!album.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={album.data.picture}
                style={{ width: 100, height: 100, borderRadius: '100%' }}
              />
              <HeaderInfo>
                <HeaderTitle>{album.data.name}</HeaderTitle>
              </HeaderInfo>
            </HeaderContainer>
            <Buttons>
              {album.tracks.data.length > 0 && (
                <Button onClick={handlePlaylistPlay}>Tocar Músicas</Button>
              )}
            </Buttons>
          </Header>

          {album.tracks.data.length > 0 ? (
            <Section>
              <SectionTitle>Músicas</SectionTitle>
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
            <SectionTitle>Nenhuma música disponível</SectionTitle>
          )}
        </React.Fragment>
      )}
    </Content>
  );
}

export default Album;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Creators as PlaylistActions } from '../../store/ducks/playlist';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderInfo,
  HeaderTitle,
  Meta,
  Buttons,
  Button,
  Section,
  SectionTitle,
  TracksList,
} from './styles';

function Playlist({
  match: {
    params: { playlistId },
  },
}) {
  const {
    fetchPlaylist,
    fetchTracks,
    clearPlaylist,
    requestDeletePlaylist,
  } = PlaylistActions;

  const playlist = useSelector(state => state.playlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylist(playlistId));
    dispatch(fetchTracks(1, playlistId));

    return () => {
      dispatch(clearPlaylist());
    };
  }, []);

  function handlePlaylistPlay() {
    dispatch(PlayerActions.fetchPlaylist(playlistId, 'playlists'));
  }

  return (
    <Content>
      {playlist.loading && playlist.tracks.loading && (
        <LoadingSpinner size={120} loading={playlist.loading} />
      )}

      {!playlist.loading && !playlist.tracks.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={playlist.data.picture}
                fallback={fallback}
                style={{ width: 100, height: 100, borderRadius: '100%' }}
              />
              <HeaderTitle>{playlist.data.name}</HeaderTitle>
            </HeaderContainer>

            <HeaderInfo>
              <div>
                <Meta>{`${playlist.data.tracks} Músicas`}</Meta>
              </div>
              <Buttons>
                <Button
                  onClick={() =>
                    dispatch(requestDeletePlaylist(playlist.data.id))
                  }
                >
                  Excluir Playlist
                </Button>
                {playlist.tracks.data.length > 0 && (
                  <Button onClick={handlePlaylistPlay}>Tocar Músicas</Button>
                )}
              </Buttons>
            </HeaderInfo>
          </Header>

          {playlist.tracks.data.length > 0 ? (
            <Section>
              <SectionTitle>Músicas</SectionTitle>
              <TracksList>
                {playlist.tracks.data.map(data => (
                  <TrackItem key={data.id} data={data} />
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

export default Playlist;

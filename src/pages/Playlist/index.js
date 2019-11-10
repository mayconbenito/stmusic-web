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
      {playlist.loading && (
        <LoadingSpinner size={120} loading={playlist.loading} />
      )}

      {!playlist.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={playlist.data.picture}
                fallback={fallback}
                style={{ width: 90, height: 90 }}
              />
              <HeaderInfo>
                <HeaderTitle>{playlist.data.name}</HeaderTitle>
                <Meta>{`${playlist.data.tracks} Músicas`}</Meta>
              </HeaderInfo>
            </HeaderContainer>
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

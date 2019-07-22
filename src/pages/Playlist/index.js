import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

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

import { Creators as PlayerActions } from '../../store/ducks/player';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import Image from '../../components/Image';

import { Creators as PlaylistActions } from '../../store/ducks/playlist';

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

  const onEndReached = useCallback(
    () => {
      if (playlist.tracks.total > playlist.tracks.data.length) {
        dispatch(fetchTracks(playlist.tracks.page, playlistId));
      }
    },
    [playlist.tracks.page, playlist.tracks.total],
  );

  const artistListRef = useBottomScrollListener(onEndReached);

  function handlePlaylistPlay() {
    dispatch(PlayerActions.fetchPlaylist(playlistId));
  }

  return (
    <Content ref={artistListRef}>
      {playlist.loading && <LoadingSpinner size={120} loading={playlist.loading} />}

      {!playlist.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image src={playlist.data.picture} style={{ width: 160, height: 90 }} />
              <HeaderInfo>
                <HeaderTitle>{playlist.data.name}</HeaderTitle>
                <Meta>{`${playlist.data.tracks} Músicas`}</Meta>
              </HeaderInfo>
            </HeaderContainer>
            <Buttons>
              <Button onClick={() => dispatch(requestDeletePlaylist(playlist.data.id))}>Excluir Playlist</Button>
              <Button onClick={handlePlaylistPlay}>Tocar Músicas</Button>
            </Buttons>
          </Header>

          <Section>
            <SectionTitle>
              {playlist.tracks.data.length > 0 ? 'Músicas' : 'Nenhuma música disponível'}
            </SectionTitle>
            <TracksList>
              {playlist.tracks.data.map(data => (
                <TrackItem key={data.id} data={data} />
              ))}
            </TracksList>
          </Section>
        </React.Fragment>
      )}
    </Content>
  );
}

export default Playlist;

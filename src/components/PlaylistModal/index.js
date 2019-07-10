import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { MdClear } from 'react-icons/md';

import {
  Container,
  Modal,
  Header,
  HeaderTitle,
  HeaderButton,
  Body,
  Playlists,
  PlaylistItem,
  PlaylistOpacity,
  PlaylistInfo,
  PlaylistTitle,
  PlaylistTracks,
} from './styles';

import { Creators as PlaylistModalActions } from '../../store/ducks/playlistModal';

import Image from '../Image';
import LoadingSpinner from '../LoadingSpinner';

function PlaylistModal() {
  const {
    fetchPlaylists,
    addTrack,
    closeModal,
    clearState,
  } = PlaylistModalActions;
  const playlistModal = useSelector(state => state.playlistModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylists());

    return () => {
      dispatch(clearState());
    };
  }, []);

  function handleAddTrack(id) {
    dispatch(addTrack(id, playlistModal.trackId));
  }

  function handleCloseModal() {
    dispatch(closeModal());
  }

  function handleCloseModalFromContainer(e) {
    if (e.target.id === 'container') handleCloseModal();
  }

  const onEndReached = useCallback(() => {
    if (playlistModal.playlists.total > playlistModal.playlists.data.length) {
      dispatch(fetchPlaylists(playlistModal.playlists.page));
    }
  }, [playlistModal.playlists.total, playlistModal.playlists.page]);

  const playlistListRef = useBottomScrollListener(onEndReached);

  return (
    <Container id="container" onClick={handleCloseModalFromContainer}>
      <Modal>
        { playlistModal.playlists.loading && playlistModal.playlists.data.length === 0 && (
          <LoadingSpinner size={48} loading={playlistModal.playlists.loading} />
        )}
        {
          playlistModal.playlists.data.length > 0 && (
            <React.Fragment>
              <Header>
                <HeaderTitle>Salvar em</HeaderTitle>
                <HeaderButton onClick={handleCloseModal}>
                  <MdClear size={18} color="#d99207" />
                </HeaderButton>
              </Header>
              <Body>
                <Playlists ref={playlistListRef}>
                  {
                    playlistModal.playlists.data.map(playlist => (
                      <PlaylistItem key={playlist.id} onClick={() => handleAddTrack(playlist.id)}>
                        <PlaylistOpacity />
                        <Image
                          src={playlist.picture}
                          style={{
                            borderWidth: 1,
                            borderColor: '#d99207',
                            borderStyle: 'solid',
                            width: 170,
                            height: 80,
                          }}
                        />
                        <PlaylistInfo>
                          <PlaylistTitle>
                            {playlist.name}
                          </PlaylistTitle>
                          <PlaylistTracks>{`${playlist.tracks} Músicas`}</PlaylistTracks>
                        </PlaylistInfo>
                      </PlaylistItem>
                    ))}
                </Playlists>
              </Body>
            </React.Fragment>
          )}
      </Modal>
    </Container>
  );
}

export default PlaylistModal;

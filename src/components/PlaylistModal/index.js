import React, { useEffect, useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { MdClear } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import { Creators as PlaylistModalActions } from '../../store/ducks/playlistModal';
import Image from '../Image';
import LoadingSpinner from '../LoadingSpinner';
import {
  Container,
  Modal,
  Header,
  HeaderTitle,
  HeaderButton,
  Body,
  PlaylistItem,
  PlaylistOpacity,
  PlaylistInfo,
  PlaylistTitle,
  PlaylistTracks,
  Warning,
} from './styles';

function PlaylistModal() {
  const {
    fetchPlaylists,
    addTrack,
    closeModal,
    clearState,
  } = PlaylistModalActions;
  const playlistModal = useSelector(state => state.playlistModal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        <Header>
          <HeaderTitle>{t('playlist_modal.title')}</HeaderTitle>
          <HeaderButton onClick={handleCloseModal}>
            <MdClear size={18} color="#d99207" />
          </HeaderButton>
        </Header>
        <Body ref={playlistListRef}>
          {playlistModal.playlists.data.length === 0 &&
            !playlistModal.playlists.loading && (
              <Warning>{t('commons.you_dont_have_any_playlist')}</Warning>
            )}
          {playlistModal.playlists.loading &&
            playlistModal.playlists.data.length === 0 && (
              <LoadingSpinner
                size={48}
                loading={playlistModal.playlists.loading}
              />
            )}
          {playlistModal.playlists.data.map(playlist => (
            <PlaylistItem
              key={playlist.id}
              onClick={() => handleAddTrack(playlist.id)}
            >
              <PlaylistOpacity />
              <Image
                src={playlist.picture}
                fallback={fallback}
                style={{
                  borderWidth: 1,
                  borderColor: '#141414',
                  borderStyle: 'solid',
                  width: 90,
                  height: 90,
                }}
              />
              <PlaylistInfo>
                <PlaylistTitle>{playlist.name}</PlaylistTitle>
                <PlaylistTracks>{`${playlist.tracks} ${t(
                  'commons.tracks'
                )}`}</PlaylistTracks>
              </PlaylistInfo>
            </PlaylistItem>
          ))}
        </Body>
      </Modal>
    </Container>
  );
}

export default PlaylistModal;

import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import {
  PlaylistList,
  PlaylistItem,
  PlaylistInfo,
  PlaylistMeta,
  PlaylistName,
  PlaylistTracks,
  PlaylistButton,
  Warning,
} from './styles';

import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';


import { Creators as LibraryPlaylistActions } from '../../store/ducks/libraryPlaylist';
import { Creators as PlaylistActions } from '../../store/ducks/playlist';

function LibraryPlaylists({ history }) {
  const { fetchPlaylists, clearPlaylists } = LibraryPlaylistActions;
  const LibraryPlaylist = useSelector(state => state.libraryPlaylist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylists());

    return () => {
      dispatch(clearPlaylists());
    };
  }, []);

  const onEndReached = useCallback(() => {
    if (LibraryPlaylist.total > LibraryPlaylist.data.length) {
      dispatch(fetchPlaylists(LibraryPlaylist.page));
    }
  }, [LibraryPlaylist.page, LibraryPlaylist.total]);

  const playlistListRef = useBottomScrollListener(onEndReached);

  return (
    <PlaylistList ref={playlistListRef}>
      { LibraryPlaylist.data.length === 0 && !LibraryPlaylist.loading && <Warning>Você ainda nao tem nenhuma playlist.</Warning> }
      {
        LibraryPlaylist.data.length === 0 && LibraryPlaylist.loading && <LoadingSpinner loading={LibraryPlaylist.loading} size={40} />
      }
      { LibraryPlaylist.data.map(playlist => (
        <PlaylistItem key={playlist.id}>
          <Image
            src={playlist.picture}
            style={{ width: 160, height: 90 }}
            onClick={() => history.push(`/playlists/${playlist.id}`)}
          />

          <PlaylistInfo>
            <PlaylistMeta>
              <PlaylistName>{playlist.name}</PlaylistName>
              <PlaylistTracks>
                {`${playlist.tracks} Músicas`}
              </PlaylistTracks>
            </PlaylistMeta>
            <PlaylistButton onClick={() => dispatch(PlaylistActions.requestDeletePlaylist(playlist.id))} type="button">Deletar</PlaylistButton>
          </PlaylistInfo>
        </PlaylistItem>
      ))}
    </PlaylistList>
  );
}

export default LibraryPlaylists;

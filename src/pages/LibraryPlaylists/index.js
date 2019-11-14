import React, { useEffect, useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useDispatch, useSelector } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Creators as LibraryPlaylistActions } from '../../store/ducks/libraryPlaylist';
import {
  PlaylistList,
  PlaylistItem,
  PlaylistInfo,
  PlaylistMeta,
  PlaylistName,
  PlaylistTracks,
  Warning,
} from './styles';

function LibraryPlaylists({ history }) {
  const { fetchPlaylists, clearPlaylists } = LibraryPlaylistActions;
  const libraryPlaylist = useSelector(state => state.libraryPlaylist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!libraryPlaylist.data.length > 0) dispatch(fetchPlaylists());

    return () => {
      dispatch(clearPlaylists());
    };
  }, []);

  const onEndReached = useCallback(() => {
    if (libraryPlaylist.total > libraryPlaylist.data.length) {
      dispatch(fetchPlaylists(libraryPlaylist.page));
    }
  }, [libraryPlaylist.page, libraryPlaylist.total]);

  const playlistListRef = useBottomScrollListener(onEndReached);

  return (
    <PlaylistList ref={playlistListRef}>
      {libraryPlaylist.data.length === 0 && !libraryPlaylist.loading && (
        <Warning>Você ainda nao tem nenhuma playlist.</Warning>
      )}
      {libraryPlaylist.data.length === 0 && libraryPlaylist.loading && (
        <LoadingSpinner loading={libraryPlaylist.loading} size={40} />
      )}
      {libraryPlaylist.data.map(playlist => (
        <PlaylistItem key={playlist.id}>
          <Image
            src={playlist.picture}
            fallback={fallback}
            style={{ width: 90, height: 90 }}
            onClick={() => history.push(`/playlists/${playlist.id}`)}
          />

          <PlaylistInfo>
            <PlaylistMeta>
              <PlaylistName>{playlist.name}</PlaylistName>
              <PlaylistTracks>{`${playlist.tracks} Músicas`}</PlaylistTracks>
            </PlaylistMeta>
          </PlaylistInfo>
        </PlaylistItem>
      ))}
    </PlaylistList>
  );
}

export default LibraryPlaylists;

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
} from './styles';

import Image from '../../components/Image';

import { Creators as LibraryActions } from '../../store/ducks/library';
import { Creators as PlaylistActions } from '../../store/ducks/playlist';

function LibraryPlaylists({ history }) {
  const { fetchPlaylists, clearPlaylists } = LibraryActions;
  const library = useSelector(state => state.library);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylists());

    return () => {
      dispatch(clearPlaylists());
    };
  }, []);

  const onEndReached = useCallback(() => {
    if (library.playlist.total > library.playlist.data.length) {
      dispatch(fetchPlaylists(library.playlist.page));
    }
  }, [library.playlist.page, library.playlist.total]);

  const playlistListRef = useBottomScrollListener(onEndReached);

  return (
    <PlaylistList ref={playlistListRef}>

      { library.playlist.data.map(playlist => (
        <PlaylistItem key={playlist.id}>
          <Image
            src={playlist.picture}
            style={{ width: 180, height: 90 }}
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

import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import {
  ArtistList,
  ArtistItem,
  ArtistInfo,
  ArtistName,
  ArtistFollowers,
} from './styles';

import { Creators as LibraryActions } from '../../store/ducks/library';
import Image from '../../components/Image';

function LibraryArtists({ history }) {
  const { fetchArtists, clearArtists } = LibraryActions;
  const library = useSelector(state => state.library);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtists());

    return () => {
      dispatch(clearArtists());
    };
  }, []);

  const onEndReached = useCallback(() => {
    if (library.artist.total > library.artist.data.length) {
      dispatch(fetchArtists(library.artist.page));
    }
  }, [library.artist.page, library.artist.total]);

  const artistListRef = useBottomScrollListener(onEndReached);

  return (
    <ArtistList ref={artistListRef}>
      {
        library.artist.data.map(data => (
          <ArtistItem key={data.id}>
            <Image src={data.picture} style={{ width: 80, height: 80, borderRadius: '100%' }} onClick={() => history.push(`/artists/${data.id}`)} />
            <ArtistInfo>
              <ArtistName onClick={() => history.push(`/artists/${data.id}`)}>{data.name}</ArtistName>
              <ArtistFollowers>{`${data.followers} Seguidores`}</ArtistFollowers>
            </ArtistInfo>
          </ArtistItem>
        ))}
    </ArtistList>
  );
}

export default LibraryArtists;

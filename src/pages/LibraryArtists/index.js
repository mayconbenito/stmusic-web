import React, { useEffect, useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useDispatch, useSelector } from 'react-redux';

import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Creators as LibraryArtistActions } from '../../store/ducks/libraryArtist';
import {
  ArtistList,
  ArtistItem,
  ArtistInfo,
  ArtistName,
  ArtistFollowers,
  Warning,
} from './styles';

function LibraryArtists({ history }) {
  const { fetchArtists, clearArtists } = LibraryArtistActions;
  const libraryArtist = useSelector(state => state.libraryArtist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtists());

    return () => {
      dispatch(clearArtists());
    };
  }, []);

  const onEndReached = useCallback(() => {
    if (libraryArtist.total > libraryArtist.data.length) {
      dispatch(fetchArtists(libraryArtist.page));
    }
  }, [libraryArtist.page, libraryArtist.total]);

  const artistListRef = useBottomScrollListener(onEndReached);

  return (
    <ArtistList ref={artistListRef}>
      {libraryArtist.data.length === 0 && !libraryArtist.loading && (
        <Warning>Você ainda nao segue nenhum artista.</Warning>
      )}
      {libraryArtist.data.length === 0 && libraryArtist.loading && (
        <LoadingSpinner loading={libraryArtist.loading} size={40} />
      )}
      {libraryArtist.data.map(data => (
        <ArtistItem key={data.id}>
          <Image
            src={data.picture}
            style={{ width: 80, height: 80, borderRadius: '100%' }}
            onClick={() => history.push(`/artists/${data.id}`)}
          />
          <ArtistInfo>
            <ArtistName onClick={() => history.push(`/artists/${data.id}`)}>
              {data.name}
            </ArtistName>
            <ArtistFollowers>{`${data.followers} Seguidores`}</ArtistFollowers>
          </ArtistInfo>
        </ArtistItem>
      ))}
    </ArtistList>
  );
}

export default LibraryArtists;

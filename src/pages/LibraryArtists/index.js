import React, { useEffect, useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import LoadingSpinner from '../../components/LoadingSpinner';
import SmallArtistItem from '../../components/SmallArtistItem';
import { Creators as LibraryArtistActions } from '../../store/ducks/libraryArtist';
import {
  ArtistList,
  Warning,
} from './styles';

function LibraryArtists({ history }) {
  const { fetchArtists } = LibraryArtistActions;
  const libraryArtist = useSelector((state) => state.libraryArtist);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!libraryArtist.data.length > 0) {
      dispatch(fetchArtists(1));
    }
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
        <Warning>{t('library.you_are_not_following_any_artist')}</Warning>
      )}
      {libraryArtist.data.length === 0 && libraryArtist.loading && (
        <LoadingSpinner loading={libraryArtist.loading} size={40} />
      )}
      {libraryArtist.data.map((artist) => <SmallArtistItem key={artist.id} data={artist} onClick={() => history.push(`/artists/${artist.id}`)} />)}
    </ArtistList>
  );
}

export default LibraryArtists;

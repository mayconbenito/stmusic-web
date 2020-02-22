import React, { useEffect, useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
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
  const { fetchArtists } = LibraryArtistActions;
  const libraryArtist = useSelector(state => state.libraryArtist);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!libraryArtist.data.length > 0) dispatch(fetchArtists(1));
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
      {libraryArtist.data.map(artist => (
        <ArtistItem key={artist.id}>
          <Image
            src={artist.picture}
            fallback={fallback}
            style={{
              width: 80,
              height: 80,
              borderRadius: '100%',
              cursor: 'pointer',
            }}
            onClick={() => history.push(`/artists/${artist.id}`)}
          />
          <ArtistInfo>
            <ArtistName onClick={() => history.push(`/artists/${artist.id}`)}>
              {artist.name}
            </ArtistName>
            <ArtistFollowers>{`${artist.followers} ${t(
              'commons.followers'
            )}`}</ArtistFollowers>
          </ArtistInfo>
        </ArtistItem>
      ))}
    </ArtistList>
  );
}

export default LibraryArtists;

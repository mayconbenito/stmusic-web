import React, { useEffect, useCallback, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from 'react-query';

import LoadingSpinner from '../../components/LoadingSpinner';
import SmallArtistItem from '../../components/SmallArtistItem';
import api from '../../services/api';
import { ArtistList, Warning } from './styles';

function LibraryArtists({ history }) {
  const { t } = useTranslation();
  const [totalArtists, setTotalArtists] = useState(0);

  const artistsQuery = useInfiniteQuery(
    'libraryArtists',
    async (key, page = 1) => {
      const response = await api.get(`/app/me/following/artists?page=${page}`);

      return response.data;
    },
    {
      getFetchMore: (lastGroup) => {
        if (Math.ceil(lastGroup.meta.total / 10) > lastGroup.meta.page) {
          return lastGroup.meta.page + 1;
        }

        return false;
      },
    }
  );

  const onEndReached = useCallback(() => {
    artistsQuery.fetchMore();
  }, []);

  useEffect(() => {
    if (artistsQuery.isSuccess) {
      artistsQuery.data.forEach((group) => {
        setTotalArtists(totalArtists + group.artists.length);
      });
    }
  }, [artistsQuery.isSuccess, artistsQuery.data]);

  const artistListRef = useBottomScrollListener(onEndReached);

  return (
    <ArtistList ref={artistListRef}>
      {artistsQuery.isLoading && <LoadingSpinner loading size={40} />}

      {artistsQuery.isError && (
        <Warning>{t('commons.internal_server_error')}</Warning>
      )}

      {artistsQuery.isSuccess && totalArtists === 0 && (
        <Warning>{t('library.you_are_not_following_any_artist')}</Warning>
      )}

      {artistsQuery.isSuccess &&
        totalArtists > 0 &&
        artistsQuery.data.map((group, index) => (
          <React.Fragment key={index}>
            {group.artists.map((artist) => (
              <SmallArtistItem
                key={artist.id}
                data={artist}
                onClick={() => history.push(`/artists/${artist.id}`)}
              />
            ))}
          </React.Fragment>
        ))}
    </ArtistList>
  );
}

export default LibraryArtists;

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdClear } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import SmallAlbumItem from '../../components/SmallAlbumItem';
import SmallArtistItem from '../../components/SmallArtistItem';
import SmallTrackItem from '../../components/SmallTrackItem';
import isStringEmpty from '../../helpers/isStringEmpty'
import useDebounce from '../../hooks/useDebounce'
import { Creators as SearchActions } from '../../store/ducks/search';
import {
  Content,
  SearchInputContainer,
  SearchInput,
  ClearSearchButton,
  SectionContainer,
  Section,
  SectionTitle,
  SectionItems,
} from './styles';

function Search({ history }) {
  const { setQuery, fetchSearch, clearSearch } = SearchActions;
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const debouncedQuery = useDebounce(search.query, 500)

  function handleInput(e) {
    const { value } = e.target;
    dispatch(setQuery(value));
  }

  useEffect(() => {
    if (!isStringEmpty(debouncedQuery)) {
      dispatch(fetchSearch(search.query));
    } else {
      dispatch(clearSearch());
    }
  }, [debouncedQuery]);

  function handleClearSearch() {
    dispatch(clearSearch())
    dispatch(setQuery(''))
  }

  return (
    <Content>
      <SearchInputContainer>
        <SearchInput
          value={search.query}
          onChange={handleInput}
          autoFocus
          placeholder={t('search.input')}
        />

        {!isStringEmpty(search.query) &&
          <ClearSearchButton onClick={handleClearSearch}>
            <MdClear size={26} color="#d99207" />
          </ClearSearchButton>
        }
      </SearchInputContainer>

      <SectionContainer>
        {search.data.artists.length > 0 && (
          <Section>
            <SectionTitle>{t('commons.artists')}</SectionTitle>
            <SectionItems>
              {search.data.artists.map(data => (
                <SmallArtistItem
                  key={data.id}
                  data={data}
                  onClick={() => history.push(`/artists/${data.id}`)}
                />
              ))}
            </SectionItems>
          </Section>
        )}

        {search.data.albums.length > 0 && (
          <Section>
            <SectionTitle>{t('commons.albums')}</SectionTitle>
            <SectionItems>
              {search.data.albums.map(data => (
                <SmallAlbumItem
                  key={data.id}
                  data={data}
                  onClick={() => history.push(`/albums/${data.id}`)}
                />
              ))}
            </SectionItems>
          </Section>
        )}

        {search.data.tracks.length > 0 && (
          <Section>
            <SectionTitle>{t('commons.tracks')}</SectionTitle>
            <SectionItems>
              {search.data.tracks.map(data => (
                <SmallTrackItem key={data.id} data={data} />
              ))}
            </SectionItems>
          </Section>
        )}
      </SectionContainer>
    </Content>
  );
}

export default Search;

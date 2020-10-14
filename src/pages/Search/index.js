import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdClear } from 'react-icons/md';

import GlobalHeader from '../../components/GlobalHeader';
import SmallAlbumItem from '../../components/SmallAlbumItem';
import SmallArtistItem from '../../components/SmallArtistItem';
import SmallTrackItem from '../../components/SmallTrackItem';
import SearchContext from '../../contexts/SearchContext';
import isStringEmpty from '../../helpers/isStringEmpty';
import useDebounce from '../../hooks/useDebounce';
import {
  GlobalHeaderContainer,
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
  const { t } = useTranslation();
  const searchContext = useContext(SearchContext);
  const [query, setQuery] = useState(searchContext.query);

  const debouncedQuery = useDebounce(query, 400);

  function handleInput(e) {
    setQuery(e.target.value);
  }

  function handleClearSearch() {
    setQuery('');
    searchContext.handleClearSearch();
  }

  useEffect(() => {
    if (!isStringEmpty(debouncedQuery)) {
      searchContext.handleSearch(query);
    } else {
      handleClearSearch();
    }
  }, [debouncedQuery]);

  return (
    <Content>
      <GlobalHeaderContainer>
        <GlobalHeader history={history} />
      </GlobalHeaderContainer>

      <SearchInputContainer>
        <SearchInput
          value={query}
          onChange={handleInput}
          autoFocus
          placeholder={t('search.input')}
        />

        {!isStringEmpty(query) && (
          <ClearSearchButton onClick={handleClearSearch}>
            <MdClear size={26} color="#d99207" />
          </ClearSearchButton>
        )}
      </SearchInputContainer>

      <SectionContainer>
        {searchContext.results.artists.length > 0 && (
          <Section>
            <SectionTitle>{t('commons.artists')}</SectionTitle>
            <SectionItems>
              {searchContext.results.artists.map((data) => (
                <SmallArtistItem
                  key={data.id}
                  data={data}
                  onClick={() => history.push(`/artists/${data.id}`)}
                />
              ))}
            </SectionItems>
          </Section>
        )}

        {searchContext.results.albums.length > 0 && (
          <Section>
            <SectionTitle>{t('commons.albums')}</SectionTitle>
            <SectionItems>
              {searchContext.results.albums.map((data) => (
                <SmallAlbumItem
                  key={data.id}
                  data={data}
                  onClick={() => history.push(`/albums/${data.id}`)}
                />
              ))}
            </SectionItems>
          </Section>
        )}

        {searchContext.results.tracks.length > 0 && (
          <Section>
            <SectionTitle>{t('commons.tracks')}</SectionTitle>
            <SectionItems>
              {searchContext.results.tracks.map((data) => (
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

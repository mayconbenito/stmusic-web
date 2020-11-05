import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdClear } from 'react-icons/md';

import GlobalHeader from '../../components/GlobalHeader';
import SmallAlbumItem from '../../components/SmallAlbumItem';
import SmallArtistItem from '../../components/SmallArtistItem';
import SmallTrackItem from '../../components/SmallTrackItem';
import SearchContext from '../../contexts/SearchContext';
import isStringEmpty from '../../helpers/isStringEmpty';
import theme from '../../styles/theme';
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

  function handleInput(e) {
    searchContext.setQuery(e.target.value);
  }

  function handleClearSearch() {
    searchContext.setQuery('');
    searchContext.handleClearSearch();
  }

  return (
    <Content>
      <GlobalHeaderContainer>
        <GlobalHeader history={history} />
      </GlobalHeaderContainer>

      <SearchInputContainer>
        <SearchInput
          value={searchContext.query}
          onChange={handleInput}
          autoFocus
          placeholder={t('search.input')}
        />

        {!isStringEmpty(searchContext.query) && (
          <ClearSearchButton onClick={handleClearSearch}>
            <MdClear size={26} color={theme.colors.primary} />
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
                <SmallTrackItem key={data.id} showMenu data={data} />
              ))}
            </SectionItems>
          </Section>
        )}
      </SectionContainer>
    </Content>
  );
}

export default Search;

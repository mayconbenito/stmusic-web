import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AlbumItem from '../../components/AlbumItem';
import ArtistItem from '../../components/ArtistItem';
import TrackItem from '../../components/TrackItem';
import { Creators as SearchActions } from '../../store/ducks/search';
import {
  Content,
  SearchInput,
  SectionContainer,
  Section,
  SectionTitle,
  SectionItems,
} from './styles';

function Search({ history }) {
  const { fetchSearch, clearSearch } = SearchActions;
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  function handleInput(e) {
    const { value } = e.target;
    setQuery(value);
  }

  useEffect(() => {
    if (query === '') {
      dispatch(clearSearch());
      return;
    }
    dispatch(fetchSearch(query));
  }, [query]);

  return (
    <Content>
      <SearchInput
        autoFocus
        onChange={handleInput}
        placeholder="Buscar artistas, albums e músicas."
      />

      <SectionContainer>
        {search.data.artists.length > 0 && (
          <Section>
            <SectionTitle>Artistas</SectionTitle>
            <SectionItems>
              {search.data.artists.map(data => (
                <ArtistItem
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
            <SectionTitle>Albums</SectionTitle>
            <SectionItems>
              {search.data.albums.map(data => (
                <AlbumItem
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
            <SectionTitle>Músicas</SectionTitle>
            <SectionItems>
              {search.data.tracks.map(data => (
                <TrackItem key={data.id} data={data} />
              ))}
            </SectionItems>
          </Section>
        )}
      </SectionContainer>
    </Content>
  );
}

export default Search;

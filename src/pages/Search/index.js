import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Content,
  SearchInput,
  SectionContainer,
  Section,
  SectionTitle,
  SectionItems,
} from './styles';

import TrackItem from '../../components/TrackItem';
import ArtistItem from '../../components/ArtistItem';

import { fetchSearch, clearSearch } from '../../store/ducks/search';
import { play } from '../../store/ducks/player';

function Search({ history }) {
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
      <SearchInput autoFocus onChange={handleInput} placeholder="Buscar músicas e artistas." />

      <SectionContainer>
        {search.data.tracks.length > 0 && (
          <Section>
            <SectionTitle>Músicas</SectionTitle>
            <SectionItems>
              {
                search.data.tracks.map(data => <TrackItem key={data.id} data={data} onClick={() => dispatch(play(data))} /> )
              }
            </SectionItems>
          </Section>
        )}

        {search.data.artists.length > 0 && (
          <Section>
            <SectionTitle>Artistas</SectionTitle>
            <SectionItems>
              {
                search.data.artists.map(data => <ArtistItem key={data.id} data={data} onClick={() => history.push(`/artists/${data.id}`)} />)
              }
            </SectionItems>
          </Section>
        )}
      </SectionContainer>
    </Content>
  );
}

export default Search;


import React, { useEffect, useState } from 'react';

import isStringEmpty from '../helpers/isStringEmpty';
import api from '../services/api';

const SearchContext = React.createContext({
  query: '',
  results: {
    artists: [],
    albums: [],
    tracks: [],
  },
  handleSearch() {},
  handleClearSearch() {},
});

export default SearchContext;

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    artists: [],
    albums: [],
    tracks: [],
  });

  async function handleSearch(searchQuery) {
    try {
      const response = await api.get(`/app/search/${searchQuery}`, {
        params: {
          limit: 20,
          type: 'artist,album,track',
        },
      });

      setResults(response.data.results);
      // eslint-disable-next-line no-empty
    } catch {}
  }

  function handleClearSearch() {
    setQuery('');
    setResults({ artists: [], albums: [], tracks: [] });
  }

  useEffect(() => {
    if (!isStringEmpty(query)) {
      handleSearch(query);
    } else {
      handleClearSearch();
    }
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        results,
        query,
        setQuery,
        handleSearch,
        handleClearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

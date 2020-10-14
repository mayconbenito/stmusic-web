import React, { useState } from 'react';

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
    setQuery(searchQuery);
    const response = await api.get(`/app/search/${searchQuery}`, {
      params: {
        limit: 20,
        type: 'artist,album,track',
      },
    });

    setResults(response.data.results);
  }

  function handleClearSearch() {
    setQuery('');
    setResults({ artists: [], albums: [], tracks: [] });
  }

  return (
    <SearchContext.Provider
      value={{
        results,
        query,
        handleSearch,
        handleClearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

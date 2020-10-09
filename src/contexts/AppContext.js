import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

const AppContext = React.createContext({
  showPlayer: false,
  togglePlayer() {},
  playlistModal: null,
  showPlaylistModal() {},
  closePlaylistModal() {},
});

export default AppContext;

export const AppProvider = ({ children }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playlistModal, setPlaylistModal] = useState(null);

  function togglePlayer() {
    setShowPlayer(!showPlayer);
  }

  function showPlaylistModal({ trackId, picture }) {
    setPlaylistModal({
      track: { id: trackId, picture },
    });
  }

  function closePlaylistModal() {
    setPlaylistModal(null);
  }

  return (
    <AppContext.Provider
      value={{
        showPlayer,
        togglePlayer,
        playlistModal,
        showPlaylistModal,
        closePlaylistModal,
      }}
    >
      <ThemeProvider theme={{ showPlayer }}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

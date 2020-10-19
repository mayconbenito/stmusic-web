import React, { useContext } from 'react';

import Player from '../../components/Player';
import PlaylistModal from '../../components/PlaylistModal';
import SideBar from '../../components/SideBar';
import AppContext from '../../contexts/AppContext';

function AppLayout({ children }) {
  const appContext = useContext(AppContext);

  return (
    <>
      <SideBar />
      <Player />
      {children}
      {appContext.playlistModal && <PlaylistModal />}
    </>
  );
}

export default AppLayout;

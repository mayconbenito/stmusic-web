import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdHome, MdSearch, MdFolder, MdAudiotrack } from 'react-icons/md';
import { useMutation, useQueryCache } from 'react-query';

import { isLoggedIn } from '../../helpers/session';
import api from '../../services/api';
import theme from '../../styles/theme';
import {
  Container,
  Header,
  Logo,
  Menu,
  MenuItem,
  MenuText,
  PlaylistInput,
  CreatePlaylist,
  CreatePlaylistButton,
} from './styles';

function SideBar() {
  const { t } = useTranslation();
  const [playlistName, setPlaylistName] = useState('');
  const queryCache = useQueryCache();

  const [createPlaylist] = useMutation(
    async ({ name }) => {
      const response = await api.post(`/app/me/library/playlists`, {
        name,
      });

      return response.data;
    },
    {
      onSettled: () => {
        queryCache.invalidateQueries('libraryPlaylists');
      },
    }
  );

  function handlePlaylistName(e) {
    setPlaylistName(e.target.value);
  }

  function handleSubmitPlaylist() {
    createPlaylist({ name: playlistName });
    setPlaylistName('');
  }

  return (
    <Container>
      <Header>
        <Logo>
          <MdAudiotrack size={40} color={theme.colors.primary} />
        </Logo>

        <Menu>
          <div>
            <MenuItem>
              <MdHome size={36} color={theme.colors.primary} />
              <MenuText to="/">{t('sidebar.home')}</MenuText>
            </MenuItem>

            {isLoggedIn() && (
              <MenuItem>
                <MdFolder size={36} color={theme.colors.primary} />
                <MenuText to="/library/playlists">
                  {t('sidebar.library')}
                </MenuText>
              </MenuItem>
            )}

            <MenuItem>
              <MdSearch size={36} color={theme.colors.primary} />
              <MenuText to="/search">{t('sidebar.search')}</MenuText>
            </MenuItem>
          </div>
        </Menu>
      </Header>

      {isLoggedIn() && (
        <CreatePlaylist>
          <PlaylistInput
            id="playlistInput"
            value={playlistName}
            onChange={handlePlaylistName}
            placeholder={t('sidebar.playlist_input')}
          />
          <CreatePlaylistButton onClick={handleSubmitPlaylist}>
            {t('sidebar.create_playlist_button')}
          </CreatePlaylistButton>
        </CreatePlaylist>
      )}
    </Container>
  );
}

export default React.memo(SideBar);

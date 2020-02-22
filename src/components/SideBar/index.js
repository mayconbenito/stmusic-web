import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdHome, MdSearch, MdFolder, MdAudiotrack } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import session from '../../services/session';
import { Creators as PlaylistActions } from '../../store/ducks/playlist';
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
  Profile,
  Username,
  ProfileButton,
} from './styles';

function SideBar({ history }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [playlistInput, setPlaylistInput] = useState('');
  const { user } = session();

  function logout() {
    localStorage.removeItem('@STMusic:token');
    window.location = '/';
  }

  function handlePlaylistName(e) {
    setPlaylistInput(e.target.value);
  }

  function handleSubmitPlaylist() {
    dispatch(PlaylistActions.requestCreatePlaylist(playlistInput));
    setPlaylistInput('');
  }

  return (
    <Container>
      <Header>
        <Logo>
          <MdAudiotrack size={40} color="#d99207" />
        </Logo>

        <Menu>
          <div>
            <MenuItem>
              <MdHome size={36} color="#d99207" />
              <MenuText to="/">{t('sidebar.home')}</MenuText>
            </MenuItem>

            {session() && (
              <MenuItem>
                <MdFolder size={36} color="#d99207" />
                <MenuText to="/library/playlists">
                  {t('sidebar.library')}
                </MenuText>
              </MenuItem>
            )}

            <MenuItem>
              <MdSearch size={36} color="#d99207" />
              <MenuText to="/search">{t('sidebar.search')}</MenuText>
            </MenuItem>
          </div>
        </Menu>
      </Header>

      {session() && (
        <CreatePlaylist>
          <PlaylistInput
            id="playlistInput"
            value={playlistInput}
            onChange={handlePlaylistName}
            placeholder={t('sidebar.playlist_input')}
          />
          <CreatePlaylistButton onClick={handleSubmitPlaylist}>
            {t('sidebar.create_playlist_button')}
          </CreatePlaylistButton>
        </CreatePlaylist>
      )}

      <Profile>
        {session() ? (
          <>
            <Username href="#">{user.name}</Username>
            <ProfileButton onClick={logout} href="#">
              {t('sidebar.logout_button')}
            </ProfileButton>
          </>
        ) : (
          <ProfileButton onClick={() => history.push('/login')} href="#">
            {t('sidebar.login_button')}
          </ProfileButton>
        )}
      </Profile>
    </Container>
  );
}

export default React.memo(SideBar);

import React, { useState } from 'react';
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
              <MenuText to="/">Ínicio</MenuText>
            </MenuItem>

            {session() && (
              <MenuItem>
                <MdFolder size={36} color="#d99207" />
                <MenuText to="/library/playlists">Biblioteca</MenuText>
              </MenuItem>
            )}

            <MenuItem>
              <MdSearch size={36} color="#d99207" />
              <MenuText to="/search">Buscar</MenuText>
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
            placeholder="Nome da playlist"
          />
          <CreatePlaylistButton onClick={handleSubmitPlaylist}>
            Criar Playlist
          </CreatePlaylistButton>
        </CreatePlaylist>
      )}

      <Profile>
        {session() ? (
          <>
            <Username href="#">{user.name}</Username>
            <ProfileButton onClick={logout} href="#">
              Sair
            </ProfileButton>
          </>
        ) : (
          <ProfileButton onClick={() => history.push('/login')} href="#">
            Fazer Login
          </ProfileButton>
        )}
      </Profile>
    </Container>
  );
}

export default React.memo(SideBar);

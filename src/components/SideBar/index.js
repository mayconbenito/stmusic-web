import React, { useState } from 'react';
import {useDispatch} from 'react-redux';

import {
  MdHome, MdSearch, MdFolder, MdAudiotrack,
} from 'react-icons/md';

import {
  Container,
  Header,
  Logo,
  Menu,
  MenuItem,
  MenuText,
  Profile,
  ProfileImage,
  ProfileButtons,
  ProfileButton,
  CreatePlaylist,
  PlaylistLabel,
  PlaylistInput,
  CreatePlaylistButton,
} from './styles';

import { Creators as PlaylistActions } from '../../store/ducks/playlist';
import session from '../../services/session';

function SideBar() {
  const dispatch = useDispatch();
  const [playlistInput, setPlaylistInput] = useState('');
  const { user } = session();

  function logout() {
    localStorage.removeItem('@STMusic:token');
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
          <MenuItem>
            <MdHome size={36} color="#d99207" />
            <MenuText to="/">Ínicio</MenuText>
          </MenuItem>

          <MenuItem>
            <MdFolder size={36} color="#d99207" />
            <MenuText to="/library/playlists">Biblioteca</MenuText>
          </MenuItem>

          <MenuItem>
            <MdSearch size={36} color="#d99207" />
            <MenuText to="/search">Buscar</MenuText>
          </MenuItem>
        </Menu>
      </Header>

      <CreatePlaylist>
        <PlaylistLabel>Criar playlist</PlaylistLabel>
        <PlaylistInput value={playlistInput} onChange={handlePlaylistName} placeholder="Nome da playlist" />
        <CreatePlaylistButton onClick={handleSubmitPlaylist}>
          Criar Playlist
        </CreatePlaylistButton>
      </CreatePlaylist>

      <Profile>
        <ProfileImage />
        <ProfileButtons>
          <ProfileButton href="#">{user.name}</ProfileButton>
          <ProfileButton onClick={logout} href="#">Sair</ProfileButton>
        </ProfileButtons>
      </Profile>
    </Container>
  );
}

export default React.memo(SideBar);

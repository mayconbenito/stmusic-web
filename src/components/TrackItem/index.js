import React from 'react';
import { MdPlayArrow, MdPlaylistAdd } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import session from '../../services/session';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Creators as PlaylistModalActions } from '../../store/ducks/playlistModal';
import Image from '../Image';
import { Container, Opacity, PlayButton, Title, AddOnPlaylist } from './styles';

function TrackItem({ data, style }) {
  const dispatch = useDispatch();
  return (
    <Container style={style}>
      <Opacity />
      <Image src={data.picture} style={{ width: 260, height: 146 }} />
      <PlayButton onClick={() => dispatch(PlayerActions.play(data))}>
        <MdPlayArrow size={80} color="#d99207" />
      </PlayButton>
      <Title>{data.name}</Title>
      {session() && (
        <AddOnPlaylist
          onClick={() => dispatch(PlaylistModalActions.openModal(data.id))}
        >
          <MdPlaylistAdd size={30} color="#d99207" />
        </AddOnPlaylist>
      )}
    </Container>
  );
}

export default React.memo(TrackItem);

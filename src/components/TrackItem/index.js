import React from 'react';
import { useDispatch } from 'react-redux';

import { MdPlaylistAdd } from 'react-icons/md';

import {
  Container,
  Details,
  Name,
  TextList,
  Type,
  AddOnPlaylist,
} from './styles';

import Image from '../Image';

import { Creators as PlayerActions } from '../../store/ducks/player';
import { Creators as PlaylistModalActions } from '../../store/ducks/playlistModal';

import session from '../../services/session';

function TrackItem({ data, style }) {
  const dispatch = useDispatch();
  return (
    <Container style={style} onClick={() => dispatch(PlayerActions.play(data))}>
      <Image src={data.picture} style={{ width: 150, height: 150 }} />

      <Details>
        <Name>{data.name}</Name>
        <TextList>
          <Type>Música | </Type>
          {data.artists.map(
            (artist, index) => (index ? ', ' : '') + artist.name
          )}
        </TextList>
      </Details>

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

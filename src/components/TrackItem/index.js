import React from 'react';
import { MdPlaylistAdd } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import session from '../../services/session';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Creators as PlaylistModalActions } from '../../store/ducks/playlistModal';
import Image from '../Image';
import {
  Container,
  Details,
  Name,
  TextList,
  Type,
  AddOnPlaylist,
} from './styles';

function TrackItem({ data, style }) {
  const dispatch = useDispatch();
  return (
    <Container style={style}>
      <Image
        src={data.picture}
        fallback={fallback}
        style={{ width: 150, height: 150 }}
      />

      <Details onClick={() => dispatch(PlayerActions.play(data))}>
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
          onClick={() => {
            dispatch(PlaylistModalActions.openModal(data.id));
          }}
        >
          <MdPlaylistAdd size={30} color="#d99207" />
        </AddOnPlaylist>
      )}
    </Container>
  );
}

export default React.memo(TrackItem);

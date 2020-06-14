import React from 'react';
import { useTranslation } from 'react-i18next';
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

function SmallTrackItem({ data, style }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Container style={style}>
      <Image
        src={data.picture}
        fallback={fallback}
        style={{ width: 50, height: 50, cursor: 'pointer' }}
      />

      <Details onClick={() => dispatch(PlayerActions.play(data))}>
        <Name>{data.name}</Name>
        <TextList>
          <Type>{t('commons.track')} | </Type>
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
          <MdPlaylistAdd size={22} color="#d99207" />
        </AddOnPlaylist>
      )}
    </Container>
  );
}

export default React.memo(SmallTrackItem);

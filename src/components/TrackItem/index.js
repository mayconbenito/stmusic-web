import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import session from '../../services/session';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Creators as PlaylistModalActions } from '../../store/ducks/playlistModal';
import Image from '../Image';
import ToolbarMenu, { ToolbarMenuItem } from '../ToolbarMenu';
import {
  Container,
  Details,
  Name,
  TextList,
  Type,
  ToolbarButton
} from './styles';

function TrackItem({ data, style }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
          <Type>{t('commons.track')} | </Type>
          {data.artists.map(
            (artist, index) => (index ? ', ' : '') + artist.name
          )}
        </TextList>
      </Details>

      {session() && (
        <ToolbarButton>
          <ToolbarMenu style={{ marginLeft: 'auto' }}>
            <ToolbarMenuItem onClick={() => dispatch(PlaylistModalActions.openModal(data.id))}>Adicionar à uma playlist</ToolbarMenuItem>
          </ToolbarMenu>
        </ToolbarButton>
      )}
    </Container>
  );
}

export default React.memo(TrackItem);

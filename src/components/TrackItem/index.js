import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import fallback from '../../assets/images/fallback.png';
import AppContext from '../../contexts/AppContext';
import { isLoggedIn } from '../../helpers/session';
import Image from '../Image';
import ToolbarMenu, { ToolbarMenuItem } from '../ToolbarMenu';
import {
  Container,
  Details,
  Name,
  TextList,
  Type,
  ToolbarButton,
} from './styles';

function TrackItem({ data, style, onClick }) {
  const appContext = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <Container style={style}>
      <Image
        src={data.picture}
        fallback={fallback}
        style={{ width: 150, height: 150 }}
      />

      <Details>
        <Name onClick={onClick}>{data.name}</Name>
        <TextList>
          <Type>{t('commons.track')} | </Type>
          {data.artists
            .slice(0, 2)
            .map((artist, index) => (index ? ', ' : '') + artist.name)}
        </TextList>
      </Details>

      {isLoggedIn() && (
        <ToolbarButton>
          <ToolbarMenu style={{ marginLeft: 'auto' }}>
            <ToolbarMenuItem
              onClick={() =>
                appContext.showPlaylistModal({
                  trackId: data.id,
                  picture: data.picture,
                })
              }
            >
              Adicionar à uma playlist
            </ToolbarMenuItem>
          </ToolbarMenu>
        </ToolbarButton>
      )}
    </Container>
  );
}

export default React.memo(TrackItem);

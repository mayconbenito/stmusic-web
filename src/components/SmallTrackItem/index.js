import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import fallback from '../../assets/images/fallback.png';
import AppContext from '../../contexts/AppContext';
import { isLoggedIn } from '../../helpers/session';
import Image from '../Image';
import ToolbarMenu, { ToolbarMenuItem } from '../ToolbarMenu';
import { Container, Details, Name, TextList, Type } from './styles';

function SmallTrackItem({
  data,
  style,
  isPlaylist = false,
  onRemoveTrackFromPlaylist,
  onPress,
}) {
  const appContext = useContext(AppContext);

  const { t } = useTranslation();

  return (
    <Container style={style}>
      <Image
        onClick={onPress}
        src={data.picture}
        fallback={fallback}
        style={{ width: 50, height: 50, cursor: 'pointer' }}
      />

      <Details onClick={onPress}>
        <Name>{data.name}</Name>
        <TextList>
          <Type>{t('commons.track')} | </Type>
          {data.artists.map(
            (artist, index) => (index ? ', ' : '') + artist.name
          )}
        </TextList>
      </Details>

      {isLoggedIn() && (
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
          {isPlaylist && (
            <ToolbarMenuItem onClick={onRemoveTrackFromPlaylist}>
              Remover da Playlist
            </ToolbarMenuItem>
          )}
        </ToolbarMenu>
      )}
    </Container>
  );
}

export default React.memo(SmallTrackItem);

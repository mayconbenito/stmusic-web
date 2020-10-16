import React from 'react';
import { useTranslation } from 'react-i18next';

import fallback from '../../assets/images/fallback.png';
import Image from '../Image';
import { Container, Details, Name, TextList, Type } from './styles';

function SmallAlbumItem({ data, style, onClick }) {
  const { t } = useTranslation();

  return (
    <Container style={style}>
      <Image
        onClick={onClick}
        src={data.picture}
        fallback={fallback}
        style={{ width: 50, height: 50, cursor: 'pointer' }}
      />

      <Details onClick={onClick}>
        <Name>{data.name}</Name>
        <TextList>
          <Type>{t('commons.album')} | </Type>
          {data.artists.map(
            (artist, index) => (index ? ', ' : '') + artist.name
          )}
        </TextList>
      </Details>
    </Container>
  );
}

export default React.memo(SmallAlbumItem);

import React from 'react';
import { useTranslation } from 'react-i18next';

import fallback from '../../assets/images/fallback.png';
import Image from '../Image';
import { Container, Info, Name, Followers } from './styles';

function SmallArtistItem({ data, style, onClick }) {
  const { t } = useTranslation();

  return (
    <Container style={style} key={data.id}>
      <Image
        src={data.picture}
        fallback={fallback}
        style={{
          width: 80,
          height: 80,
          borderRadius: '100%',
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
      <Info>
        <Name onClick={onClick}>{data.name}</Name>
        <Followers>{`${data.followers} ${t('commons.followers')}`}</Followers>
      </Info>
    </Container>
  );
}

export default React.memo(SmallArtistItem);

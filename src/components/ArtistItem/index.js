import React from 'react';

import fallback from '../../assets/images/fallback.png';
import { Container, Opacity, Image, Name } from './styles';

function ArtistItem({ data, onClick }) {
  return (
    <Container>
      <Opacity onClick={onClick} />
      <Image src={data.picture} fallback={fallback} />
      <Name>{data.name}</Name>
    </Container>
  );
}

export default React.memo(ArtistItem);

import React from 'react';

import {
  Container,
  Opacity,
  Image,
  Name,
} from './styles';


function ArtistItem({ data, onClick }) {
  return (
    <Container onClick={onClick}>
      <Opacity />
      <Image src={data.picture} />
      <Name>{data.name}</Name>
    </Container>
  );
}

export default React.memo(ArtistItem);

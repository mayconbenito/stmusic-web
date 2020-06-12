import React from 'react';

import { Container, Name, Image } from './styles';

function GenreItem({ data, onClick }) {
  return (
    <Container onClick={onClick}>
      <Image />
      <Name onClick={onClick}>{data.name}</Name>
    </Container>
  );
}

export default GenreItem;

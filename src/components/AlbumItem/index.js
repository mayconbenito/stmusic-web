import React from 'react';

import { Container, Details, Name, TextList, Type } from './styles';

import Image from '../Image';

function AlbumItem({ data, big, onClick }) {
  return (
    <Container big={big} onClick={onClick}>
      <Image
        src={data.picture}
        style={big ? { width: 200, height: 200 } : { width: 150, height: 150 }}
      />
      <Details>
        <Name big={big}>{data.name}</Name>
        <TextList big={big}>
          <Type>
            {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
            {' | '}
          </Type>
          {data.artists.map(
            (artist, index) => (index ? ', ' : '') + artist.name
          )}
        </TextList>
      </Details>
    </Container>
  );
}

export default AlbumItem;

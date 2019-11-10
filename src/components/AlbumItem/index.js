import React from 'react';

import fallback from '../../assets/images/fallback.png';
import Image from '../Image';
import { Container, Details, Name, TextList, Type } from './styles';

function AlbumItem({ data, big, onClick }) {
  return (
    <Container big={big} onClick={onClick}>
      <Image
        src={data.picture}
        fallback={fallback}
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

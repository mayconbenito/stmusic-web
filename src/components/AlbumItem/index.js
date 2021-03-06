import React from 'react';

import fallback from '../../assets/images/fallback.png';
import Image from '../Image';
import { Container, Details, Name, TextList, Type } from './styles';

function AlbumItem({ data, onClick }) {
  return (
    <Container>
      <Image
        onClick={onClick}
        src={data.picture}
        fallback={fallback}
        style={{ width: 150, height: 150, cursor: 'pointer' }}
      />
      <Details>
        <Name onClick={onClick}>{data.name}</Name>
        <TextList>
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

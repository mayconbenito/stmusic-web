import React from 'react';

import Image from '../Image';
import { Container, Details, AlbumName, ArtistsNames } from './styles';

function AlbumItem({ data, big, onClick }) {
  return (
    <Container big={big} onClick={onClick}>
      <Image
        src={data.picture}
        style={big ? { width: 200, height: 200 } : { width: 150, height: 150 }}
      />
      <Details>
        <AlbumName big={big}>{data.name}</AlbumName>
        <ArtistsNames big={big}>
          {data.artists.map(
            (artist, index) => (index ? ', ' : '') + artist.name
          )}
        </ArtistsNames>
      </Details>
    </Container>
  );
}

export default AlbumItem;

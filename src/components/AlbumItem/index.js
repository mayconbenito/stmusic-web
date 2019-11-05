import React from 'react';

import { Container, ArtistsNames } from './styles';

import Image from '../Image';

function AlbumItem({ data, big, onClick }) {
  return (
    <Container big={big} onClick={onClick}>
      <Image
        src={data.picture}
        style={big ? { width: 200, height: 200 } : { width: 100, height: 100 }}
      />
      <ArtistsNames>
        {data.artists.map((artist, index) => (index ? ', ' : '') + artist.name)}
      </ArtistsNames>
    </Container>
  );
}

export default AlbumItem;

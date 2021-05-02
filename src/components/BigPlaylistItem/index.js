import React from 'react';

import fallback from '../../assets/images/fallback.png';
import Image from '../Image';
import { Container, Details, Name, TextList, Type } from './styles';

function BigPlaylistItem({ data, onClick }) {
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
          <Type>Playlist</Type>
        </TextList>
      </Details>
    </Container>
  );
}

export default BigPlaylistItem;

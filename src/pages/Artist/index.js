import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import {
  Content,
  Header,
  HeaderContainer,
  HeaderInfo,
  HeaderTitle,
  Meta,
  Buttons,
  Button,
  Section,
  SectionTitle,
  TracksList,
} from './styles';

import { play } from '../../store/ducks/player';

import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import Image from '../../components/Image';

import { Creators as ArtistActions } from '../../store/ducks/artist';

function Artist({
  match: {
    params: { artistId },
  },
}) {
  const { fetchArtist, fetchTracks, clearArtist } = ArtistActions;
  const artist = useSelector(state => state.artist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtist(artistId));
    dispatch(fetchTracks(1, artistId));

    return () => {
      dispatch(clearArtist());
    };
  }, []);

  const onEndReached = useCallback(
    () => {
      if (artist.tracks.total > artist.tracks.data.length) {
        dispatch(fetchTracks(artist.tracks.page, artistId));
      }
    },
    [artist.tracks.page, artist.tracks.total],
  );

  const artistListRef = useBottomScrollListener(onEndReached);

  return (
    <Content ref={artistListRef}>
      {artist.loading && <LoadingSpinner size={120} loading={artist.loading} />}

      {!artist.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={artist.data.picture}
                style={{ width: 100, height: 100, borderRadius: '100%' }}
              />
              <HeaderInfo>
                <HeaderTitle>{artist.data.name}</HeaderTitle>
                <Meta>{`${artist.data.followers} Seguidores`}</Meta>
                <Meta>{`${artist.data.tracks} Músicas`}</Meta>
              </HeaderInfo>
            </HeaderContainer>
            <Buttons>
              <Button>Seguir</Button>
              <Button>Tocar Músicas</Button>
            </Buttons>
          </Header>

          <Section>
            <SectionTitle>
              {artist.tracks.data.length > 0 ? 'Músicas' : 'Nenhuma música disponível'}
            </SectionTitle>
            <TracksList>
              {artist.tracks.data.map(data => (
                <TrackItem
                  key={data.id}
                  data={data}
                  onClick={() => dispatch(play(data))}
                  style={{ marginBottom: 5 }}
                />
              ))}
            </TracksList>
          </Section>
        </React.Fragment>
      )}
    </Content>
  );
}

export default Artist;

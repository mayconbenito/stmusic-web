import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import AlbumItem from '../../components/AlbumItem';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackItem from '../../components/TrackItem';
import session from '../../services/session';
import { Creators as ArtistActions } from '../../store/ducks/artist';
import { Creators as PlayerActions } from '../../store/ducks/player';
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

function Artist({
  match: {
    params: { artistId },
  },
  history,
}) {
  const {
    fetchArtist,
    fetchTracks,
    fetchAlbums,
    clearArtist,
    followArtist,
    unfollowArtist,
  } = ArtistActions;
  const artist = useSelector(state => state.artist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtist(artistId));
    dispatch(fetchTracks(1, artistId));
    dispatch(fetchAlbums(1, artistId));

    return () => {
      dispatch(clearArtist());
    };
  }, []);

  function handleFollowing() {
    if (artist.data.followingState) {
      dispatch(unfollowArtist(artistId));
    } else {
      dispatch(followArtist(artistId));
    }
  }

  useEffect(() => {
    console.log(artist.data);
  }, [artist]);

  function handlePlaylistPlay() {
    dispatch(PlayerActions.fetchPlaylist(artistId, 'artists'));
  }

  return (
    <Content>
      {artist.loading && <LoadingSpinner size={120} loading={artist.loading} />}
      {!artist.loading && (
        <React.Fragment>
          <Header>
            <HeaderContainer>
              <Image
                src={artist.data.picture}
                fallback={fallback}
                style={{ width: 100, height: 100, borderRadius: '100%' }}
              />
              <HeaderTitle>{artist.data.name}</HeaderTitle>
            </HeaderContainer>

            <HeaderInfo>
              <div>
                <Meta>{`${artist.data.followers} Seguidores`}</Meta>
                <Meta>{`${artist.data.tracks} Músicas`}</Meta>
              </div>
              <Buttons>
                {session() && (
                  <Button onClick={handleFollowing}>
                    {artist.data.followingState ? 'Seguindo' : 'Seguir'}
                  </Button>
                )}
                {artist.tracks.data.length > 0 && (
                  <Button onClick={handlePlaylistPlay}>Tocar Músicas</Button>
                )}
              </Buttons>
            </HeaderInfo>
          </Header>

          {artist.tracks.data.length > 0 && (
            <Section>
              <SectionTitle>Músicas</SectionTitle>
              <TracksList>
                {artist.tracks.data.map(data => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    style={{ marginBottom: 5 }}
                  />
                ))}
              </TracksList>
            </Section>
          )}

          {artist.albums.data.length > 0 && (
            <Section>
              <SectionTitle>Albums</SectionTitle>
              <TracksList>
                {artist.albums.data.map(data => (
                  <AlbumItem
                    big
                    key={data.id}
                    data={data}
                    style={{ marginBottom: 5 }}
                    onClick={() => history.push(`/albums/${data.id}`)}
                  />
                ))}
              </TracksList>
            </Section>
          )}
        </React.Fragment>
      )}
    </Content>
  );
}

export default Artist;

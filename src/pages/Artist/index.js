import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import fallback from '../../assets/images/fallback.png';
import AlbumItem from '../../components/AlbumItem';
import Carrousel from '../../components/Carrousel';
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
    fetchMostPlayedTracks,
    fetchAlbums,
    clearArtist,
    followArtist,
    unfollowArtist,
  } = ArtistActions;
  const artist = useSelector(state => state.artist);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchArtist(artistId));
    dispatch(fetchTracks(1, artistId));
    dispatch(fetchMostPlayedTracks(1, artistId));
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
                <Meta>{`${artist.data.followers} ${t(
                  'commons.followers'
                )}`}</Meta>
                <Meta>{`${artist.data.tracks} ${t('commons.tracks')}`}</Meta>
              </div>
              <Buttons>
                {session() && (
                  <Button onClick={handleFollowing}>
                    {artist.data.followingState
                      ? t('commons.following')
                      : t('commons.follow')}
                  </Button>
                )}
                {artist.tracks.data.length > 0 && (
                  <Button onClick={handlePlaylistPlay}>
                    {t('commons.play_tracks_button')}
                  </Button>
                )}
              </Buttons>
            </HeaderInfo>
          </Header>

          {artist.albums.data.length > 0 && (
            <Section>
              <Carrousel
                carrouselName={t('commons.albums')}
                totalItems={artist.albums.data.length}
              >
                {artist.albums.data.map(data => (
                  <AlbumItem
                    key={data.id}
                    data={data}
                    style={{ marginBottom: 5 }}
                    onClick={() => history.push(`/albums/${data.id}`)}
                  />
                ))}
              </Carrousel>
            </Section>
          )}

          {artist.mostPlayedTracks.data.length > 0 && (
            <Section>
              <Carrousel
                carrouselName={t('artist.most_played_tracks')}
                totalItems={artist.mostPlayedTracks.data.length}
              >
                {artist.mostPlayedTracks.data.map(data => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    style={{ marginBottom: 5 }}
                  />
                ))}
              </Carrousel>
            </Section>
          )}

          {artist.tracks.data.length > 0 && (
            <Section>
              <Carrousel
                carrouselName={t('artist.all_artist_tracks')}
                totalItems={artist.tracks.data.length}
              >
                {artist.tracks.data.map(data => (
                  <TrackItem
                    key={data.id}
                    data={data}
                    style={{ marginBottom: 5 }}
                  />
                ))}
              </Carrousel>
            </Section>
          )}
        </React.Fragment>
      )}
    </Content>
  );
}

export default Artist;

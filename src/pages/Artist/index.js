import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import fallback from '../../assets/images/fallback.png';
import AlbumItem from '../../components/AlbumItem';
import Carrousel from '../../components/Carrousel';
import GlobalHeader from '../../components/GlobalHeader';
import Image from '../../components/Image';
import LoadingSpinner from '../../components/LoadingSpinner';
import SmallTrackItem from '../../components/SmallTrackItem';
import session from '../../services/session';
import { Creators as ArtistActions } from '../../store/ducks/artist';
import { Creators as PlayerActions } from '../../store/ducks/player';
import {
  Content,
  Header,
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
    followArtist,
    unfollowArtist,
    clearArtist,
  } = ArtistActions;
  const params = useParams();
  const artist = useSelector((state) => state.artist);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (Number(params.artistId) !== artist.data.id) {
      dispatch(clearArtist());
      dispatch(fetchArtist(artistId));
    }
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
      <GlobalHeader history={history} />

      {artist.loading && <LoadingSpinner size={120} loading={artist.loading} />}

      {!artist.loading && (
        <>
          <Header>
            <Image
              src={artist.data.picture}
              fallback={fallback}
              style={{ width: 100, height: 100, borderRadius: '100%' }}
            />

            <HeaderInfo>
              <HeaderTitle>{artist.data.name}</HeaderTitle>

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
                {artist.albums.data.map((data) => (
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
              <SectionTitle>{t('artist.most_played_tracks')}</SectionTitle>
              <TracksList>
                {artist.mostPlayedTracks.data.map((data) => (
                  <SmallTrackItem key={data.id} data={data} />
                ))}
              </TracksList>
            </Section>
          )}

          {artist.tracks.data.length > 0 && (
            <Section>
              <SectionTitle>{t('artist.all_artist_tracks')}</SectionTitle>
              <TracksList>
                {artist.tracks.data.map((data) => (
                  <SmallTrackItem key={data.id} data={data} />
                ))}
              </TracksList>
            </Section>
          )}
        </>
      )}
    </Content>
  );
}

export default Artist;

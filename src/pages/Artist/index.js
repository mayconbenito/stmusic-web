import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdPlayArrow } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import fallback from '../../assets/images/fallback.png';
import AlbumItem from '../../components/AlbumItem';
import Carousel from '../../components/Carousel';
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
  SectionTitleContainer,
  SectionTitle,
  SectionPlayButton,
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

  function handleQueuePlay({ name, tracks, nameKey }) {
    dispatch(
      PlayerActions.loadQueue(null, {
        id: `${nameKey}-${artistId}`,
        name,
        tracks,
      })
    );
  }

  function handleQueueTrackPlay(track, nameKey) {
    dispatch(PlayerActions.play(track, `${nameKey}-${artistId}`));
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
              </Buttons>
            </HeaderInfo>
          </Header>

          {artist.albums.data.length > 0 && (
            <Section>
              <Carousel
                carouselName={t('commons.albums')}
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
              </Carousel>
            </Section>
          )}

          {artist.mostPlayedTracks.data.length > 0 && (
            <Section>
              <SectionTitleContainer>
                <SectionTitle>{t('artist.most_played_tracks')}</SectionTitle>
                <SectionPlayButton
                  onClick={() =>
                    handleQueuePlay({
                      name: `${t('commons.most_played_from')} ${
                        artist.data.name
                      }`,
                      tracks: artist.mostPlayedTracks.data,
                      nameKey: 'most_played_from',
                    })
                  }
                >
                  <MdPlayArrow size={24} color="#d99207" />
                </SectionPlayButton>
              </SectionTitleContainer>
              <TracksList>
                {artist.mostPlayedTracks.data.map((data) => (
                  <SmallTrackItem
                    key={data.id}
                    data={data}
                    onPress={() =>
                      handleQueueTrackPlay(data, 'most_played_from')
                    }
                  />
                ))}
              </TracksList>
            </Section>
          )}

          {artist.tracks.data.length > 0 && (
            <Section>
              <SectionTitleContainer>
                <SectionTitle>{t('artist.artist_tracks')}</SectionTitle>
                <SectionPlayButton
                  onClick={() =>
                    handleQueuePlay({
                      name: artist.data.name,
                      tracks: artist.tracks.data,
                      nameKey: 'artist_tracks',
                    })
                  }
                >
                  <MdPlayArrow size={24} color="#d99207" />
                </SectionPlayButton>
              </SectionTitleContainer>
              <TracksList>
                {artist.tracks.data.map((data) => (
                  <SmallTrackItem
                    key={data.id}
                    data={data}
                    onPress={() => handleQueueTrackPlay(data, 'artist_tracks')}
                  />
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
